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
    currentPage: 0,
    hasMorePages: true,
};

const reducers = {
    [Types.LOAD_MORE_MESSAGES]: (state: StateModel, action: PaginateAction) => ({
        ...state,
        messages: [...state.messages, ...action.payload.data],
        currentPage: state.currentPage + 1,
    }),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
