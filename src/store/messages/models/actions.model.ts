/**
 * Internal dependencies.
 */
import Types from '@/store/messages/types';
import { LoadMorePagesRequestData } from '@/store/messages/interfaces/LoadMorePagesRequestData';

export interface PaginateAction {
    type: Types.LOAD_MORE_MESSAGES,
    payload: LoadMorePagesRequestData
}

type ActionsModel = PaginateAction;

export default ActionsModel;
