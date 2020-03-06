/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';
import { UserData } from '@/interfaces/UserData';

export interface ConversationData {
    id: number,
    created_at: string,
    updated_at: string,
    user: UserData,
    message: MessageData
}
