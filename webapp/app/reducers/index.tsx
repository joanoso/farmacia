import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import sys from './sys';
import {routerReducer as routing} from 'react-router-redux';

export default combineReducers({
  auth,
  sys,
  form: formReducer,
  routing
});
