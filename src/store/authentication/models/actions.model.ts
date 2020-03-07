/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import Types from '@/store/authentication/types';
import { UserData } from '@/interfaces/UserData';

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

export interface LoadUserDataAction {
    type: Types.LOAD_USER_DATA,
    payload: UserData
}

type ActionsModel = LogInAction | LogOutAction | SetAuthTokenAction | LoadUserDataAction;

export default ActionsModel;
