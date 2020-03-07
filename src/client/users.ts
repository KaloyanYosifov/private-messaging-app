/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';
import { UserData } from '@/interfaces/UserData';

class Users {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    public me(): Promise<UserData> {
        return this.httpClient.get('me')
            .then(response => response.data);
    }
}

export default Users;
