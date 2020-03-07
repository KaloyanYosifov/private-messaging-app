/**
 * Internal dependencies.
 */
import { UserData } from '@/interfaces/UserData';

export interface MessageData {
    id: number,
    unique_id: string,
    user: UserData,
    conversation_id: number,
    text: string,
    read_at: string | null,
    created_at: string,
    updated_at: string | null,
}
