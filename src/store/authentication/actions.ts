/**
 * Internal dependencies.
 */
import { Dispatch } from 'redux';
import { LogInAction, SetAuthTokenAction } from '@/store/authentication/models/actions.model';
import Types from '@/store/authentication/types';

export const logIn = () => (dispatch: Dispatch<LogInAction>) => dispatch({ type: Types.LOG_IN });
export const setAuthToken = (authToken: string) => (dispatch: Dispatch<SetAuthTokenAction>) => dispatch({
    type: Types.SET_AUTH_TOKEN,
    payload: authToken,
});
