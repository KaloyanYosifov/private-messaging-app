/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';
import { UserData } from '@/interfaces/UserData';

export interface ConversationData {
    id: number,
    created_at: string,
    updated_at: string,
    users: UserData[],
    last_message: MessageData
}
