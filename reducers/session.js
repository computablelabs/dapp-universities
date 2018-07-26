import createReducer from './createReducer';

const SESSION_REQUEST = 'SESSION_REQUEST';
const SESSION_OK = 'SESSION_OK';
const SESSION_ERROR = 'SESSION_ERROR';
const SESSION_RESET = 'SESSION_RESET';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const handlers = {
  [SESSION_REQUEST]: (state, { payload }) => ({
    ...state,
    loading: true,
    request: payload,
    error: undefined,
  }),
  [SESSION_OK]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...payload.response,
    },
    error: undefined,
  }),
  [SESSION_ERROR]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload.error,
  }),
  [SESSION_RESET]: () => ({
    ...initialState,
  }),
};

export default createReducer(handlers, initialState);

