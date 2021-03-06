/**
 * Internal dependencies.
 */
import { UserData } from '@/interfaces/UserData';
import { AttachmentData } from '@/interfaces/messaging/AttachmentData';

export interface MessageData {
    id: number,
    unique_id: string,
    user: UserData,
    conversation_id: number,
    text: string,
    attachment: AttachmentData | null,
    read_at: string | null,
    created_at: string,
    updated_at: string | null,
}
