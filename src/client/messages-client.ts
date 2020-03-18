/**
 * External dependencies.
 */
import { UploadFileItem } from 'react-native-fs';
import uuid from 'uuid';

/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';
import Recorder from '@/utils/recorder/Recorder';
import { MessageData } from '@/interfaces/messaging/MessageData';

class MessagesClient {
    protected httpClient: HttpClient;

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient || new HttpClient();
    }

    paginate(page: number = 1, conversation_id?: number | null): Promise<{ data: MessageData[], has_more_pages: boolean }> {
        return this.httpClient.get('messages', { page, conversation_id })
            .then(response => response.data);
    }

    send(text: string, conversation_id: number): Promise<MessageData> {
        return this.httpClient.post('messages', { text, conversation_id })
            .then(response => response.data);
    }

    uploadAudio(audioPath: string, conversation_id: number) {
        const name = uuid.v4() + Recorder.extension;

        const file: UploadFileItem = {
            name,
            filename: name,
            filepath: audioPath,
            filetype: Recorder.formatType,
        };
        return this.httpClient.upload('messages', file, { conversation_id })
            .then(response => response.body);
    }
}

export default MessagesClient;
