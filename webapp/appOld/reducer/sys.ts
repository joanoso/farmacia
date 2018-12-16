import axios from 'axios';
import {System} from '../common/model/System';

export const SYSTEM_CTX_INITED = 'SYSTEM_CTX_INITED';
export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

// Actions
export const systemCtxInited = (system: System) => ({type: SYSTEM_CTX_INITED, system});
export const startFetching = () => ({type: START_FETCHING, fetching: true});
export const endFetching = () => ({type: END_FETCHING, fetching: false});

// State
export interface Sys {
    fetching: boolean
    system?: System
}

const initialState = {
    fetching: false
} as Sys;

// REDUCER
export function sys(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING:
            return {...state, fetching: true};
        case END_FETCHING:
            return {...state, fetching: false};
        case SYSTEM_CTX_INITED:
            return {...state, system: action.system};
        default:
            return state;
    }
}

// Helpers
export function initSystem() {
    return (dispatch) => {
        return axios.get('/api/system')
            .then(function (response) {
                dispatch(systemCtxInited(response.data));
            });
    };
}
