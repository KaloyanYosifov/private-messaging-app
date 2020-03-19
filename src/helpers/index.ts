/**
 * External dependencies.
 */
import format from 'date-fns/format';
import addSeconds from 'date-fns/addSeconds';
import { Action } from 'redux';

export const createReducer = <S = any, A extends Action>(initalState: S, reducers: any) => {
    return (state: S = initalState, action: A) => {
        if (!Object.prototype.hasOwnProperty.call(reducers, action.type)) {
            return state;
        }

        return reducers[action.type](state, action);
    };
};

export const formatTimeForAPlayer = (seconds: number) => {
    return format(addSeconds(new Date(0), seconds), 'mm:ss');
};
