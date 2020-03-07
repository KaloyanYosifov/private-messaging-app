/**
 * External dependencies.
 */
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Internal dependencies.
 */
import Types from '@/store/authentication/types';

import { createReducer } from '@/helpers';
import { StateModel } from './models/state.model';
import ActionsModel, { SetAuthTokenAction, LoadUserDataAction } from './models/actions.model';

const initialState: StateModel = {
    isLoggedIn: false,
    authToken: null,
    userData: null,
};

const reducers = {
    [Types.LOG_IN]: (state: StateModel) => ({ ...state, isLoggedIn: true }),
    [Types.LOG_OUT]: (state: StateModel) => ({ ...state, isLoggedIn: false, authToken: null, userData: null }),
    [Types.SET_AUTH_TOKEN]: (state: StateModel, { payload: authToken }: SetAuthTokenAction) => ({ ...state, authToken }),
    [Types.LOAD_USER_DATA]: (state: StateModel, { payload: userData }: LoadUserDataAction) => ({ ...state, userData: { ...userData } }),
};

const persistConfig = {
    key: 'authentication',
    storage: AsyncStorage,
};

export { persistConfig };

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
