import * as React from 'react';

import {Provider, Store} from 'react-redux';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {AppStore} from './AppStore';
// Pages
import InitPage from './container/InitPage';
import ErrorSistemaPage from './common/container/ErrorSistemaPage';

export const createAppRouter = (store: Store<AppStore>) => {
    const history = syncHistoryWithStore(hashHistory, store);
    const app = (
        <Provider store={store}>
            <div>
                <Router history={history}>
                    <Route name='Init Page' path='/' component={InitPage}/>
                    <Route name='Error de sistema' path='app.errorSistema' component={ErrorSistemaPage}/>
                </Router>
            </div>
        </Provider>);
    return app;
};