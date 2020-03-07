/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';

class Messages {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    public paginate(page: number = 1, conversation_id?: number | null) {
        return this.httpClient.get('messages', { page, conversation_id })
            .then(response => response.data);
    }
}

export default Messages;
