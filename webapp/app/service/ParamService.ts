import * as _ from 'lodash';
import axios from 'axios';

interface CommonParam {
  id: number;
  descripcion: string;
}

class ParamService {
  private static _instance: ParamService;

  private estadosRemito: CommonParam[] = [];
  private tiposRemito: CommonParam[] = [];

  private constructor() {}

  public initService() {
    this.estadosRemito = [
      {
        descripcion: 'Borrador',
        id: 1
      },
      {
        descripcion: 'Pendiente',
        id: 2
      }
    ];
    this.tiposRemito = [
      {
        descripcion: 'Simple',
        id: 1
      },
      {
        descripcion: 'Complejo',
        id: 2
      }
    ];

    axios.get('api/params/estadosRemito').then((response) => {
      this.estadosRemito = response.data;
    });
    /*axios.get('api/params/tiposRemito').then(response => {
      this.tiposRemito = response.data;
    }); */
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getEstadosRemito = (): CommonParam[] => {
    return this.estadosRemito;
  };

  public getTiposRemito = (): CommonParam[] => {
    return this.tiposRemito;
  };
}

export const paramService = ParamService.Instance;
