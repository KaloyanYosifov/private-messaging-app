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
    [Types.LOAD_MORE_MESSAGES]: (state: StateModel, { payload }: PaginateAction) => ({
        ...state,
        messages: [...state.messages, ...payload.data],
        currentPage: state.currentPage + 1,
        hasMorePages: payload.has_more_pages,
    }),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
