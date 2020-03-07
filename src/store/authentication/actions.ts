/**
 * Internal dependencies.
 */
import { Dispatch } from 'redux';
import Users from '@/client/users';
import Types from '@/store/authentication/types';
import { UserData } from '@/interfaces/UserData';
import { LogInAction, LogOutAction, SetAuthTokenAction, LoadUserDataAction } from '@/store/authentication/models/actions.model';

const userClient = new Users();

export const logIn = () => (dispatch: Dispatch<LogInAction>) => dispatch({ type: Types.LOG_IN });
export const logOut = () => (dispatch: Dispatch<LogOutAction>) => dispatch({ type: Types.LOG_OUT });
export const setAuthToken = (authToken: string) => (dispatch: Dispatch<SetAuthTokenAction>) => dispatch({
    type: Types.SET_AUTH_TOKEN,
    payload: authToken,
});
export const loadUserData = () => async (dispatch: Dispatch<LoadUserDataAction>) => {
    const response = await userClient.me();

    dispatch({
        type: Types.LOAD_USER_DATA,
        payload: response,
    });
};
