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

export interface SetAuthTokenAction {
    type: Types.SET_AUTH_TOKEN
    payload: string | null
}

type ActionsModel = LogInAction | LogOutAction | SetAuthTokenAction;

export default ActionsModel;
