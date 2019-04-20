import { START_FETCHING, END_FETCHING, CHANGE_MENU, SET_SYSTEM } from './types';
import { SystemProperties } from '../reducers/sys';
import axios from 'axios';

export const startFetching = () => ({ type: START_FETCHING, fetching: true });
export const endFetching = () => ({ type: END_FETCHING, fetching: false });
export const changeMenu = () => ({ type: CHANGE_MENU });
export const setSystem = (systemProperties: SystemProperties) => ({
  type: SET_SYSTEM,
  systemProperties
});
