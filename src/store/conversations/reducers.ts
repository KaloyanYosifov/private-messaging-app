/**
 * External dependencies.
 */
import cloneDeep from 'lodash.clonedeep';

/**
 * Internal dependencies.
 */
import Types from '@/store/conversations/types';

import { createReducer } from '@/helpers';
import { StateModel } from '@/store/conversations/models/state.model';
import ActionsModel, { PaginateAction } from '@/store/conversations/models/actions.model';

const initialState: StateModel = {
    conversations: [],
    currentPage: 0,
    hasMorePages: true,
};

const reducers = {
    [Types.LOAD_MORE_CONVERSATIONS]: (state: StateModel, { payload }: PaginateAction) => ({
        ...state,
        conversations: [...state.conversations, ...payload.data],
        currentPage: state.currentPage + 1,
        hasMorePages: payload.has_more_pages,
    }),
    [Types.RESET_CONVERSATIONS]: () => cloneDeep(initialState),
};

export default createReducer<StateModel, ActionsModel>(initialState, reducers);
