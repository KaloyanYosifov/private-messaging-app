/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';
import { MessageData } from '@/interfaces/messaging/MessageData';

class Messages {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    public paginate(page: number = 1, conversation_id?: number | null): Promise<{ data: MessageData[], has_more_pages: boolean }> {
        return this.httpClient.get('messages', { page, conversation_id })
            .then(response => response.data);
    }

    public send(text: string, conversation_id: number): Promise<MessageData> {
        return this.httpClient.post('messages', { text, conversation_id })
            .then(response => response.data);
    }
}

export default Messages;
