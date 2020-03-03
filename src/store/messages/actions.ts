/**
 * External dependencies.
 */
import { Dispatch } from 'redux';
/**
 * Internal dependencies.
 */
import { PaginateAction } from '@/store/messages/models/actions.model';
import Types from '@/store/messages/types';
import Messages from '@/client/messages';

const messages = new Messages();

export const loadMoreMessages = () => (dispatch: Dispatch<PaginateAction>) => {
    messages.paginate(1)
        .then(response => {
            dispatch({ type: Types.LOAD_MORE_MESSAGES, payload: response.data });
        });
};
