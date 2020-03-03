/**
 * External dependencies.
 */
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Internal dependencies.
 */
import Types from '@/store/messages/types';

import { createReducer } from '@/helpers';
import { StateModel } from './models/state.model';
import ActionsModel, { PaginateAction } from '@/store/messages/models/actions.model';

const initialState: StateModel = {
    messages: [],
};

const reducers = {
    [Types.LOAD_MORE_MESSAGES]: (state: StateModel, action: PaginateAction) => ({
        ...state,
        messages: [...state.messages, ...action.payload],
    }),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
