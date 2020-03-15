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
import { getCurrentPage, hasMorePages } from '@/store/conversations/getters';
import { PaginateAction, ResetAction } from '@/store/conversations/models/actions.model';

const conversations = new Conversations();

export const loadMoreConversations = () => (dispatch: Dispatch<PaginateAction>, getState: () => ApplicationState) => {
    const state = getState();

    if (!hasMorePages(state)) {
        return Promise.resolve();
    }

    return conversations.paginate(getCurrentPage(state) + 1)
        .then(response => {
            dispatch({ type: Types.LOAD_MORE_CONVERSATIONS, payload: response });
        });
};

export const resetConversations = () => (dispatch: Dispatch<ResetAction>) => dispatch({ type: Types.RESET_CONVERSATIONS });
