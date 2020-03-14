/**
 * Internal dependencies.
 */
import Types from '@/store/conversations/types';
import { LoadMoreConversationsRequestData } from '@/store/conversations/interfaces/LoadMoreConversationsRequestData';

export interface PaginateAction {
    type: Types.LOAD_MORE_CONVERSATIONS,
    payload: LoadMoreConversationsRequestData
}

export interface ResetAction {
    type: Types.RESET_CONVERSATIONS
}

type ActionsModel = PaginateAction | ResetAction;

export default ActionsModel;
