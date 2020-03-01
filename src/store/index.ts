/**
 * External dependencies.
 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

/**
 * Internal dependencies.
 */
import authentication, { persistConfig } from './authentication/reducers';
import { StateModel as AuthenticationStateModel } from '@/store/authentication/models/state.model';

interface ApplicationState {
    authentication: AuthenticationStateModel
}

const reducers = combineReducers({
    authentication: persistReducer(persistConfig, authentication),
});

const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

const persistor = persistStore(store);

export { ApplicationState, persistor };
export default store;
