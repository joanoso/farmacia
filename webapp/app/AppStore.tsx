import { applyMiddleware, compose, createStore, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import { Auth } from './reducers/auth';
import { Sys } from './reducers/sys';
import rootReducer from './reducers';

export interface AppStore {
  auth: Auth;
  sys: Sys;
  router: object;
}

// Para poder acceder al store como un singleton.
export let store: Store<AppStore>;

const middlewares = [
  thunk, // lets us dispatch() functions
  reduxMiddleware
];

export const createAppStore = (
  loggerEnabled: boolean = false,
  history: History
): Store<AppStore> => {
  // Logguer para poder excluir ciertas acciones.
  let logger;
  if (loggerEnabled) {
    logger = createLogger({
      predicate: (getState, action) => action.type !== 'SEP'
    });
    middlewares.push(logger);
  }

  store = createStore(
    rootReducer(history),
    {
      auth: { authenticated: localStorage.getItem('token') ? true : false }
    },
    compose(applyMiddleware(...middlewares, routerMiddleware(history)))
  ) as Store<AppStore>;
  return store;
};
