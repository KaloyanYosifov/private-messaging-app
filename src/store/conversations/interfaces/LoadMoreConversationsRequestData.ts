/**
 * Internal dependencies.
 */
import { ConversationData } from '@/interfaces/conversations/ConversationData';

export interface LoadMoreConversationsRequestData {
    data: ConversationData[],
    has_more_pages: boolean
}
