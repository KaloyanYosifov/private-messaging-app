/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import Types from '@/store/authentication/types';

export interface LogInAction {
    type: Types.LOG_IN,
}

export interface LogOutAction {
    type: Types.LOG_OUT,
}

type ActionsModel = LogInAction | LogOutAction;

export default ActionsModel;
