export const createReducer = <S = any, A = any>(initalState: S, reducers: any) => {
    return (state: S = initalState, action: A) => {
        if (!Object.prototype.hasOwnProperty.call(reducers, action)) {
            return state;
        }

        return reducers[action](state, action);
    };
};
