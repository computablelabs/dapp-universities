// import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import rootReducer from 'reputable/dist/redux/reducers/root';

const composedMiddleware = [
  applyMiddleware(thunk),
];

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object
*   (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object
*   (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in
*   global namespace for safe HMR
*/
const initializeStore = (initialState, options) => {
  if (!options.isServer) {
    // Add Redux dev tools if available in non-production environments
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-unused-expressions */
    if (process.env.APP_ENV !== 'production') {
      if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
      }

      // const logger = createLogger();
      // composedMiddleware.push(applyMiddleware(logger));
    }
    /* eslint-enable */
  }

  const composedEnhancers = compose(...composedMiddleware);

  return createStore(
    rootReducer,
    composedEnhancers,
    // initialState,
  );
};

/*
const initializeStore = (initialState = {}) =>
  createStore(rootReducer, composedEnhancers);
*/

// const persistor = persistStore(store);

export {
  initializeStore,
  // persistor,
};

