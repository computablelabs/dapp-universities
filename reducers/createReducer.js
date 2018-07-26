const createReducer = (handlers, initialState = {}) =>
  (state = initialState, action) => {
    const handler = handlers[action.type];

    return handler ? handler(state, action) : state;
  };

export default createReducer;

