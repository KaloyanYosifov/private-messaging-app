/**
 * Internal dependencies.
 */
import Types from '@/store/authentication/types';

import { createReducer } from '@/helpers';
import { StateModel } from './models/state.model';
import ActionsModel from './models/actions.model';

const initialState: StateModel = {
    isLoggedIn: false,
};

const reducers = {
    [Types.LOG_IN]: (state: StateModel) => ({ ...state, isLoggedIn: true }),
    [Types.LOG_OUT]: (state: StateModel) => ({ ...state, isLoggedIn: false }),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
