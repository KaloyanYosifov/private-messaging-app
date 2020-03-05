/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

export const getConversations = (state: ApplicationState): ConversationData[] => state.conversations.conversations;
