/**
 * External dependencies.
 */
import { Action } from 'redux';

export const createReducer = <S = any, A extends Action>(initalState: S, reducers: any) => {
    return (state: S = initalState, action: A) => {
        if (!Object.prototype.hasOwnProperty.call(reducers, action.type)) {
            return state;
        }

        return reducers[action.type](state, action);
    };
};
