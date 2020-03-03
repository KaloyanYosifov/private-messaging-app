/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';

export interface LoadMorePagesRequestData {
    data: MessageData[],
    has_more_pages: boolean
}
