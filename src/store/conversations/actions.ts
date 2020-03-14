/**
 * External dependencies.
 */
import { Dispatch } from 'redux';
/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';
import Types from '@/store/conversations/types';
import Conversations from '@/client/conversations';
import { getCurrentPage } from '@/store/conversations/getters';
import { PaginateAction } from '@/store/conversations/models/actions.model';

const conversations = new Conversations();

export const loadMoreConversations = () => (dispatch: Dispatch<PaginateAction>, getState: () => ApplicationState) => {
    console.log(getState);
    return conversations.paginate(getCurrentPage(getState()) + 1)
        .then(response => {
            dispatch({ type: Types.LOAD_MORE_CONVERSATIONS, payload: response });
        });
};
