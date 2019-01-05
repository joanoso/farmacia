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
        case 401: {
          window.location.href = ctxPath + '/401.html';
          // log.error('Error de api authorization');
          break;
        }
        case 500:
        case 450: {
          /*log.error('Error de sistema en servicio Rest');
                    if (rootScope.system) {
                      ctxPath = rootScope.system.contextPath || '.';
                      if (response.data && response.data['errors']) {
                        state.go('app.errorSistema', {
                          'error': response.data['errors'],
                          'stack': response.data['stack']
                        });
                      } else {
                        state.go('app.errorSistema', {
                          'error': 'Error sin evaluación',
                          'stack': '' + response
                        });
                      }
                    } else {
                      window.location.href = ctxPath + '/500.html';
                    }*/
          store.dispatch(push('app.errorSistema'));
          /*window.location.href = ctxPath + '/500.html';*/
          break;
        }
        default: {
          // log.error('Error Inesperado');
          window.location.href = ctxPath + '/500.html';
        }
      }
      return Promise.reject(error);
    }
  );
}
