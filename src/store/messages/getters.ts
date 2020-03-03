/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';
import { MessageData } from '@/interfaces/messaging/MessageData';

export const getMessages = (state: ApplicationState): MessageData[] => state.messages.messages;
