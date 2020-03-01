/**
 * External dependencies.
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies.
 */
import authentication from './authentication/reducers';
import { StateModel as AuthenticationStateModel } from '@/store/authentication/models/state.model';

const reducers = combineReducers({
    authentication,
});

interface ApplicationState {
    authentication: AuthenticationStateModel
}

const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

export { ApplicationState };
export default store;
