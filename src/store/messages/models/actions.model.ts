/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import Types from '@/store/messages/types';

export interface PaginateAction {
    type: Types.LOAD_MORE_MESSAGES,
    payload: Array<any>
}

type ActionsModel = PaginateAction;

export default ActionsModel;
