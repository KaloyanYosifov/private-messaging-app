/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';

export const getMessages = (state: ApplicationState) => state.messages.messages;
