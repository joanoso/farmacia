import axios, {AxiosResponse} from 'axios';
import {Credentials} from '../common/model/auth/Credentials';
import {TOKEN_KEY} from '../common/Constants';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

// Actions
export const loginSuccess = (user: any) => ({type: LOGIN_SUCCESS, user});
export const loginFailed = () => ({type: LOGIN_FAILED});
export const logout = () => ({type: LOGOUT});

// State
export interface Auth {
    authenticated: boolean
    failed: boolean
    user: any
}

const initialState = {
    authenticated: false,
    user: undefined,
    failed: false
} as Auth;

// REDUCER
export function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, authenticated: true, failed: false, user: action.user};
        case LOGIN_FAILED:
            return {...state, authenticated: false, failed: true};
        case LOGOUT:
            return {...state, authenticated: false, failed: false, user: undefined};
        default:
            return state;
    }
}

export const login = (credentials: Credentials) => {
    return (dispatch) => {

        axios.post('http://localhost:8090/auth/login', credentials).then(
            (resp: AxiosResponse) => {
                localStorage.setItem(TOKEN_KEY, resp.data.access_token);
                dispatch(loginSuccess(undefined));
                // Ir a buscar datos de user para tenerlos
            }
        ).catch((err) => {
            console.log('error autenticacion', err);
        });
    };
};

export const logoutFn = () => {
    return (dispatch) => {
        localStorage.setItem(TOKEN_KEY, null);
        dispatch(logout());
    };

};