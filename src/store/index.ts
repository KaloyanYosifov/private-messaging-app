/**
 * External dependencies.
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies.
 */
import authentication from './authentication/reducers';

const reducers = combineReducers({
    authentication,
});

const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

export default store;
