import {Provider} from 'react-redux';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
import {routerMiddleware, routerReducer as routing} from 'react-router-redux';
import {applyMiddleware, combineReducers, compose, createStore, Store} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import {Sys, sys} from './reducer/sys';
import {Auth, auth} from './reducer/Auth';

// Stores de los reducers

// Interfaz del store para usar como autocompletado
export interface AppStore {
    routing: object
    sys: Sys
    auth: Auth
}

// Para poder acceder al store como un singleton.
export let store: Store<AppStore>;

const middlewares = [
    thunk, // lets us dispatch() functions
    reduxMiddleware
];

export const createAppStore = (loggerEnabled: boolean = false): Store<AppStore> => {
    // Logguer para poder excluir ciertas acciones.
    if (loggerEnabled) {
        const logger = createLogger({
            predicate: (getState, action) => action.type !== 'SET'
        });
        middlewares.push(logger);
    }
    const reducers = combineReducers({
        routing, sys, auth
    });
    store = createStore(
        reducers,
        compose(
            applyMiddleware(
                routerMiddleware(hashHistory),
                ...middlewares
            ),
        ),
    ) as Store<AppStore>;
    return store;
};
