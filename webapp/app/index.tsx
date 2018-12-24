import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import 'font-awesome/css/font-awesome.css';
import './assets/css/style.scss';
import { createAppStore } from './AppStore';
import { createAppRouter } from './AppRouter';
import { push } from 'connected-react-router';
import { initApiInterceptor } from './common/util/ApiInterceptor';
import { paramService } from './service/ParamService';
import { node } from 'prop-types';

const history = createBrowserHistory();
const store = createAppStore(true, history);
const router = createAppRouter(store, history);
initApiInterceptor(store);

paramService.initService();

console.log('modo', process.env.node_env);

//store.dispatch(push('/login'));
ReactDOM.render(router, document.querySelector('#root'));
