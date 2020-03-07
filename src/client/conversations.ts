/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';

class Conversations {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    public paginate(page: number = 1) {
        return this.httpClient.get('conversations', { page })
            .then(response => response.data);
    }
}

export default Conversations;
