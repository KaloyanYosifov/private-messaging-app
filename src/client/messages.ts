/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';

class Messages {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    public paginate(page: number = 1) {
        return this.httpClient.get('messages', { page });
    }
}

export default Messages;
