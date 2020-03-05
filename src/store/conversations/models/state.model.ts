/**
 * Internal dependencies.
 */
import { ConversationData } from '@/interfaces/conversations/ConversationData';

export interface StateModel {
    conversations: ConversationData[],
    currentPage: 0,
    hasMorePages: boolean
}
