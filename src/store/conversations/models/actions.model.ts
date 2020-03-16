/**
 * Internal dependencies.
 */
import Types from '@/store/conversations/types';
import { ConversationsResponseData } from '@/store/conversations/interfaces/ConversationsResponseData';

export interface PaginateAction {
    type: Types.LOAD_MORE_CONVERSATIONS,
    payload: ConversationsResponseData
}

export interface RestartPaginationAction {
    type: Types.RESTART_CONVERSATIONS,
    payload: ConversationsResponseData
}

export interface ResetAction {
    type: Types.RESET_CONVERSATIONS
}

type ActionsModel = PaginateAction | RestartPaginationAction | ResetAction;

export default ActionsModel;
