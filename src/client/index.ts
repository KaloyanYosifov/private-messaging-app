/**
 * External dependencies.
 */
import axios, { AxiosInstance, Method } from 'axios';
import { APP_BASE_URL, APP_API_ENDPOINT } from 'react-native-dotenv';

/**
 * Internal dependencies.
 */
import Store from '@/store';
import { getAuthToken } from '@/store/authentication/getters';

class HttpClient {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: APP_BASE_URL + APP_API_ENDPOINT,
        });
    }

    login(email: string, password: string) {
        return axios.post(APP_BASE_URL + '/oauth/token', {
            username: email,
            password,
            grant_type: 'password',
        });
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

        const authToken = getAuthToken(Store.getState());
        if (authToken) {
            config['headers'] = {
                Authorization: `Bearer ${authToken}`,
            };
        }

        return this.client.request(config);
    }
}

export default HttpClient;
