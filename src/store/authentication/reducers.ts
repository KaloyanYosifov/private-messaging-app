/**
 * Internal dependencies.
 */
import { LOG_IN, LOG_OUT } from '@/store/authentication/constants';

import { createReducer } from '@/helpers';
import { StateModel } from './models/state.model';
import ActionsModel from './models/actions.model';

const initialState: StateModel = {
    isLoggedIn: false,
};

const reducers = {
    [LOG_IN]: (state: StateModel) => ({ ...state, isLoggedIn: true }),
    [LOG_OUT]: (state: StateModel) => ({ ...state, isLoggedIn: true }),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
