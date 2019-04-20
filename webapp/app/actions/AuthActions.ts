import axios, { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  ME_FROM_TOKEN,
  ME_FROM_TOKEN_FAILURE,
  ME_FROM_TOKEN_SUCCESS,
  START_FETCHING,
  END_FETCHING
} from './types';
import { Dispatch } from 'redux';
import { AuthAction } from '../reducers/auth';
import { SysAction } from '../reducers/sys';
import { SignUpInfo } from '../common/model/SignUpInfo';
import { User } from '../common/model/User';
import { store } from '../AppStore';

let tokenTimeout: any;

const stopTokenRefresher = () => {
  clearTimeout(tokenTimeout);
};

const tokenRefresher = (seconds: number, dispatch: Function) => {
  const refreshTimeRequestBeforeExp = store.getState().sys.systemProperties.properties[
    'jwt.refresh.request.before.expiration'
  ];

  tokenTimeout = setTimeout(function() {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      // if there is no token, dont bother
      return;
    }
    axios
      .post('/auth/refreshToken', { token }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response: AxiosResponse<LoginResponse>) => {
        const tokenExpirationDate = new Date();
        tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + response.data.expires_in);
        dispatch({ type: AUTH_USER, user: store.getState().auth.user, tokenExpirationDate });
        tokenRefresher(response.data.expires_in, dispatch);
        localStorage.setItem('token', response.data.access_token);
      });
  }, (seconds - refreshTimeRequestBeforeExp) * 1000);
};

export const signup = (signupInfo: SignUpInfo, callback: Function) => async (
  dispatch: Dispatch<AuthAction | SysAction>
) => {
  try {
    dispatch({ type: START_FETCHING });
    const response = (await axios.post('/api/signup', signupInfo)) as AxiosResponse<AuthResponse>;
    dispatch({ type: END_FETCHING });
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + response.data.expires_in);
    dispatch({ type: AUTH_USER, user: response.data.user, tokenExpirationDate });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: END_FETCHING });
    dispatch({ type: AUTH_ERROR, errorMessage: e.response.data.error });
  }
};

export const login = (
  loginInfo: { username: string; password: string },
  callback: Function
) => async (dispatch: Dispatch<AuthAction | SysAction>) => {
  try {
    dispatch({ type: START_FETCHING });
    const response = (await axios.post('/auth/login', loginInfo)) as AxiosResponse<LoginResponse>;
    dispatch({ type: END_FETCHING });
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + response.data.expires_in);
    dispatch({ type: AUTH_USER, user: response.data.user, tokenExpirationDate });
    tokenRefresher(response.data.expires_in, dispatch);
    localStorage.setItem('token', response.data.access_token);
    callback();
  } catch (e) {
    dispatch({ type: END_FETCHING });
    dispatch({ type: AUTH_ERROR, errorMessage: 'Usuario o Contraseña inválidos' });
  }
};

export const signout = () => async (dispatch: Dispatch<AuthAction | SysAction>) => {
  localStorage.removeItem('token');
  stopTokenRefresher();
  dispatch({ type: AUTH_USER, user: undefined, tokenExpirationDate: undefined });
};

export const loadUserFromToken = () => async (dispatch: Dispatch<AuthAction | SysAction>) => {
  const token = localStorage.getItem('token');
  if (!token || token === '') {
    // if there is no token, dont bother
    return;
  }

  dispatch(meFromToken());

  // fetch user from token (if server deems it's valid token)
  meFromTokenRequest(token)
    .then((response: AxiosResponse<AuthResponse>) => {
      dispatch(meFromTokenSuccess(response.data.user));
      const tokenExpirationDate = new Date();
      tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + response.data.expires_in);
      dispatch({ type: AUTH_USER, user: response.data.user, tokenExpirationDate });
      tokenRefresher(response.data.expires_in, dispatch);
    })
    .catch((err: AxiosError) => {
      localStorage.removeItem('token'); // remove token from storage
      dispatch(meFromTokenFailure(err.response.data['message']));
    });
};

export function meFromTokenRequest(tokenFromStorage: string): AxiosPromise<AuthResponse> {
  const info = { token: tokenFromStorage };
  const request = axios({
    method: 'post',
    url: '/auth/meFromToken',
    data: info,
    headers: {
      Authorization: `Bearer ${tokenFromStorage}`
    }
  });
  return request;
}

export function meFromToken(): AuthAction {
  return {
    type: ME_FROM_TOKEN
  };
}

export function meFromTokenSuccess(currentUser): AuthAction {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    user: currentUser
  };
}

export function meFromTokenFailure(error): AuthAction {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function cleanError(): AuthAction {
  return { type: AUTH_ERROR, errorMessage: '' };
}

interface LoginResponse {
  user: User;
  access_token: string;
  expires_in: number;
}

interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}
