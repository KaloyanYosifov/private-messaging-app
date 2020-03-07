/**
 * External dependencies.
 */
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore, Dispatch } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
/**
 * Internal dependencies.
 */
import conversations from './conversations/reducers';
import authentication, { persistConfig } from './authentication/reducers';
import { StateModel as ConversationsStateModel } from '@/store/conversations/models/state.model';
import { StateModel as AuthenticationStateModel } from '@/store/authentication/models/state.model';

import ApplicationActions from '@/store/actions';

interface ApplicationState {
    conversations: ConversationsStateModel,
    authentication: AuthenticationStateModel,
}

const reducers = combineReducers({
    conversations,
    authentication: persistReducer(persistConfig, authentication),
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development') {
    window['persistor'] = persistor;
}

const dispatch = <T = any>(action: (dispatch: Dispatch<ApplicationActions>) => T): T => {
    return action(store.dispatch);
};

const getter = <T = any>(getterFunction: (state: ApplicationState) => T): T => {
    return getterFunction(store.getState() as ApplicationState);
};

export { getter, dispatch, persistor, ApplicationState, ApplicationActions };
export default store;
