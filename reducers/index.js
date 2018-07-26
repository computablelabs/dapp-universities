// Libraries
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { reducer as formReducer } from 'redux-form';

// Reducers
import session from './session';

const rootReducer = combineReducers({
  session,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;

