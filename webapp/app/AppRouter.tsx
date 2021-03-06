import * as React from 'react';
import { Store } from 'redux';
import { createBrowserHistory } from 'history';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import App from './App';
import { AppStore } from './AppStore';
import Welcome from './components/Welcome';
import Login from './components/auth/Login';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './Feature';
import CrearRemito from './components/CrearRemito';
import SeleccionarSucursal from './components/SeleccionarSucursal';
import BuscarProducto from './components/BuscarProducto';
import ConsultarRemito from './components/ConsultarRemito';
import CrearSucursal from './components/sucursal/CrearSucursal';
import BuscarSucursal from './components/sucursal/BuscarSucursal';

export const createAppRouter = (store: Store<AppStore>, history: History) => {
  const app = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/feature" component={Feature} />
          <Route path="/signout" component={Signout} />
          <Route path="/login" component={Login} />
          <Route path="/crearRemito" component={CrearRemito} />
          <Route path="/seleccionarSucursal" component={SeleccionarSucursal} />
          <Route path="/buscarSucursal" component={BuscarSucursal} />
          <Route path="/buscarProductos" component={BuscarProducto} />
          <Route path="/consultarRemitos" component={ConsultarRemito} />
          <Route path="/crearSucursal" component={CrearSucursal} />
        </App>
      </ConnectedRouter>
    </Provider>
  );
  return app;
};
