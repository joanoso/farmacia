import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { push } from 'react-router-redux';

export function initApiInterceptor(store): void {
  axios.interceptors.request.use(
    function(config: AxiosRequestConfig) {
      const token = localStorage.getItem('token');

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers.ContentType = 'application/json';
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const r = error.response;
      const ctxPath = '.';
      switch (r.status) {
        case 400: {
          // log.error('Error de negocio:' + (<any>response.data).errors);
          // return error
          break;
        }
        case 405: {
          // log.error('Error de negocio:' + (<any>response.data).errors);
          // return error
          break;
        }
        case 401: {
          window.location.href = ctxPath + '/401.html';
          // log.error('Error de api authorization');
          break;
        }
        case 500:
        case 450: {
          store.dispatch(push('app.errorSistema'));
          break;
        }
        default: {
          window.location.href = ctxPath + '/500.html';
        }
      }
      return Promise.reject(error);
    }
  );
}
