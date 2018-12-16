import axios from 'axios';
import { START_FETCHING, END_FETCHING, CHANGE_MENU } from './types';

export const startFetching = () => ({ type: START_FETCHING, fetching: true });
export const endFetching = () => ({ type: END_FETCHING, fetching: false });
export const changeMenu = () => ({ type: CHANGE_MENU });
