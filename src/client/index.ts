/**
 * External dependencies.
 */
import get from 'lodash.get';
import RNFetchBlob from 'rn-fetch-blob';
import axios, { AxiosInstance, Method } from 'axios';
import { APP_BASE_URL, APP_API_ENDPOINT } from 'react-native-dotenv';

/**
 * Internal dependencies.
 */
import { HTTP_UNAUTHORIZED } from '@/constants/Responses';

import { navigation } from '@/router';
import { dispatch, getter } from '@/store';
import { logOut } from '@/store/authentication/actions';
import { getAuthToken } from '@/store/authentication/getters';
import { RegistrationData } from './interfaces/RegistrationData';
import { FileInfo } from '@/client/interfaces/FileInfo';
import { MessageData } from '@/interfaces/messaging/MessageData';

class HttpClient {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: APP_BASE_URL + APP_API_ENDPOINT,
        });

        this.client.interceptors.response.use((response) => {
            return response;
        }, (errors) => {
            if (get(errors, 'response.status', null) === HTTP_UNAUTHORIZED) {
                dispatch(logOut());
                navigation().navigate('AuthRouter');
            }

            throw errors;
        });
    }

    login(email: string, password: string) {
        return axios.post(APP_BASE_URL + '/oauth/token', {
            username: email,
            password,
            grant_type: 'password',
        });
    }

    register(registrationData: RegistrationData) {
        return this.post('register', registrationData);
    }

    get(endpoint: string, data: any = {}) {
        return this.makeRequest('get', endpoint, data);
    }

    post(endpoint: string, data: any = {}) {
        return this.makeRequest('post', endpoint, data);
    }

    put(endpoint: string, data: any = {}) {
        return this.makeRequest('put', endpoint, data);
    }

    patch(endpoint: string, data: any = {}) {
        return this.makeRequest('patch', endpoint, data);
    }

    delete(endpoint: string, data: any = {}) {
        return this.makeRequest('delete', endpoint, data);
    }

    upload(endpoint: string, file: FileInfo, data: any = {}): Promise<MessageData> {
        const filePath = file.path.replace(/file:\/\/\//, '');

        let headers: {
            Accept: string,
            'Content-Type': string,
            Authorization?: string
        } = {
            Accept: 'application/json',
            'Content-Type': 'application/octet-stream',
        };

        const authToken = getter(getAuthToken);

        if (authToken) {
            headers = {
                ...headers,
                Authorization: `Bearer ${authToken}`,
            };
        }
        const requestData: { name: string, data: any, filename?: string, type?: string }[] = [
            {
                name: 'audio_file',
                type: file.filetype,
                filename: file.filename,
                data: RNFetchBlob.wrap(filePath),
            },
        ];

        for (const [key, value] of Object.entries(data)) {
            requestData.push({
                name: key,
                data: value,
            });
        }

        return RNFetchBlob.fetch(
            'POST',
            APP_BASE_URL + APP_API_ENDPOINT + endpoint,
            headers,
            requestData,
        )
            .then(response => {
                return JSON.parse(response.data);
            });
    }

    makeRequest(method: Method, endpoint: string, data: any = {}) {
        const config = {
            url: endpoint,
            method,
        };

        if (/get/i.test(method)) {
            config['params'] = { ...data };
        } else {
            config['data'] = { ...data };
        }

        const authToken = getter(getAuthToken);
        if (authToken) {
            config['headers'] = {
                Authorization: `Bearer ${authToken}`,
            };
        }

        return this.client.request(config);
    }
}

export default HttpClient;
