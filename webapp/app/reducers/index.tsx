import { combineReducers } from 'redux';
import auth from './auth';
import sys from './sys';
//import {routerReducer as routing} from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

const rootReducer = (history: History) => combineReducers({
  auth,
  sys,
  router: connectRouter(history)
})

export default rootReducer;
