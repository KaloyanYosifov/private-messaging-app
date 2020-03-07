/**
 * External dependencies.
 */
import { Dispatch } from 'redux';
/**
 * Internal dependencies.
 */
import Types from '@/store/conversations/types';
import Conversations from '@/client/conversations';
import { PaginateAction } from '@/store/conversations/models/actions.model';

const conversations = new Conversations();

export const loadMoreConversations = () => (dispatch: Dispatch<PaginateAction>) => {
    return conversations.paginate(1)
        .then(response => {
            dispatch({ type: Types.LOAD_MORE_CONVERSATIONS, payload: response });
        });
};
