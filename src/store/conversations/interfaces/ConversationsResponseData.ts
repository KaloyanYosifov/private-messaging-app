/**
 * Internal dependencies.
 */
import { ConversationData } from '@/interfaces/conversations/ConversationData';

export interface ConversationsResponseData {
    data: ConversationData[],
    has_more_pages: boolean
}
