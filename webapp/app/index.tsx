import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import 'font-awesome/css/font-awesome.css';
import './assets/css/style.scss';
import { createAppStore } from './AppStore';
import { createAppRouter } from './AppRouter';
import { initApiInterceptor } from './common/util/ApiInterceptor';
import { paramService } from './service/ParamService';
import { push } from 'connected-react-router';
import * as sys from './reducers/sys';
import { setSystem } from './actions/SysActions';

const history = createBrowserHistory();
const store = createAppStore(true, history);
const router = createAppRouter(store, history);
initApiInterceptor(store);
paramService.initService();
sys.getSystem().then((system) => {
  store.dispatch(setSystem(system));
});

if (!store.getState().auth.authenticated) {
  store.dispatch(push('/login'));
}

ReactDOM.render(router, document.querySelector('#root'));
