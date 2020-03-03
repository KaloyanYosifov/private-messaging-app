/**
 * External dependencies.
 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

/**
 * Internal dependencies.
 */
import authentication, { persistConfig } from './authentication/reducers';
import messages from './messages/reducers';
import { StateModel as MessagesStateModel } from '@/store/messages/models/state.model';
import { StateModel as AuthenticationStateModel } from '@/store/authentication/models/state.model';

interface ApplicationState {
    authentication: AuthenticationStateModel,
    messages: MessagesStateModel
}

const reducers = combineReducers({
    authentication: persistReducer(persistConfig, authentication),
    messages,
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

export { ApplicationState, persistor };
export default store;
