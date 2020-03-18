/**
 * External dependencies.
 */
import { UploadFileItem } from 'react-native-fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies.
 */
import HttpClient from '@/client/index';
import Recorder from '@/utils/recorder/Recorder';
import { MessageData } from '@/interfaces/messaging/MessageData';
import { FileInfo } from '@/client/interfaces/FileInfo';

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
        const name = uuidv4() + '.' + Recorder.extension;

        const file: FileInfo = {
            filename: name,
            path: audioPath,
            filetype: Recorder.formatType,
        };

        return this.httpClient.upload('messages', file, { conversation_id })
            .then(response => response);
    }
}

export default MessagesClient;
