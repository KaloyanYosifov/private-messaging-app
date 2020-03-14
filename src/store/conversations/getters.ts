/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

export const getCurrentPage = (state: ApplicationState): number => state.conversations.currentPage;
export const hasMorePages = (state: ApplicationState): boolean => state.conversations.hasMorePages;
export const getConversations = (state: ApplicationState): ConversationData[] => state.conversations.conversations;
