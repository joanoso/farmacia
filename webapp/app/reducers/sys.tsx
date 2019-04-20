import axios from 'axios';

import { START_FETCHING, END_FETCHING, CHANGE_MENU, SET_SYSTEM } from '../actions/types';

const INITIAL_STATE = {
  fetching: false,
  menuOpen: false,
  systemProperties: undefined
};

export interface Sys {
  fetching: boolean;
  menuOpen: boolean;
  systemProperties: SystemProperties;
}

export interface SystemProperties {
  version: string;
  serverTime: string;
  serverIP: string;
  logLevel: string;
  contextPath: string;
  mode: string;
  properties: { [key: string]: any };
}

export type SysAction =
  | { type: 'START_FETCHING' }
  | { type: 'END_FETCHING' }
  | { type: 'SET_SYSTEM'; systemProperties: SystemProperties }
  | { type: 'CHANGE_MENU' };

const reducer = (state = INITIAL_STATE, action: SysAction) => {
  switch (action.type) {
    case START_FETCHING:
      return { ...state, fetching: true };
    case END_FETCHING:
      return { ...state, fetching: false };
    case CHANGE_MENU:
      return { ...state, menuOpen: !state.menuOpen };
    case SET_SYSTEM:
      return { ...state, systemProperties: action.systemProperties };
    default:
      return state;
  }
};

export const getSystem = (): Promise<SystemProperties> => {
  return axios.get('api/system').then(function(response) {
    return response.data as SystemProperties;
  });
};

export default reducer;
