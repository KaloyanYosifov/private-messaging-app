/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';

export interface StateModel {
    messages: MessageData[],
    currentPage: 0,
    hasMorePages: boolean
}
