import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import { connect } from 'react-redux';
import { TextField, Button, CardTitle, DialogContainer } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, DatePicker, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import { setCurrentObject } from '../reducers/form';
import { paramService } from '../service/ParamService';
import TableList from './common/TableList';

class CrearRemito extends Component<CrearRemitoProps, any> {
  constructor(props) {
    super(props);

    // Chequeo si tengo currentObj
    if (props.currentObj) {
      const { estado, nroRemito, tipoRemito, sucursal, productos } = props.currentObj;
      const sucursalNew = dotProp.get(props, 'history.location.state.itemSelected.id', sucursal);
      const productosNew = dotProp.get(props, 'history.location.state.productos', []);
      _.forEach(productosNew, (p) => {
        p.cantidad = 0;
      });

      const prods = _.union(productosNew, productos);

      this.state = {
        estado,
        nroRemito,
        tipoRemito,
        sucursal: sucursalNew,
        productos: prods,
        visible: false
      };
    } else {
      // Puede ser Edito o nuevo, si tengo element es edit

      const element = dotProp.get(props, 'history.location.state.element', undefined);

      if (dotProp.get(props, 'history.location.state.element', undefined) !== undefined) {
        const { estado, id, sucursalDestino, tipo, detallesRemito } = element;
        this.state = {
          estado: estado.toString(),
          nroRemito: id,
          sucursal: sucursalDestino,
          tipoRemito: tipo.toString(),
          productos: detallesRemito,
          visible: false
        };
      } else {
        this.state = {
          estado: '1',
          nroRemito: '',
          sucursal: '',
          tipoRemito: '',
          productos: [],
          visible: false
        };
      }
    }
  }

  show = () => {
    this.setState({ ...this.state, visible: true });
  };

  hide = () => {
    this.setState({ ...this.state, visible: false });
    this.props.dispatch(push('/'));
  };

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = (name) => (value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleProductChange = (item) => (value, event) => {
    const productos = _.cloneDeep(this.state.productos);
    const prodModified = _.find(productos, (p) => {
      return p.id === item.id;
    });

    prodModified.cantidad = value;

    this.setState({ ...this.state, productos });
  };

  renderProductos = (prods) => {
    const tableConfig = {
      columnsToShow: ['id', 'descripcion', 'marca'],
      titles: ['ID', 'Descripción', 'Marca']
    };
    return (
      <TableList data={prods} config={tableConfig} changeCantidad={this.handleProductChange} />
    );
  };

  sucursalMask = (nroSucursal: number) => {
    if (nroSucursal == null) {
      return undefined;
    }
    if (nroSucursal === 1) {
      return 'Lalala';
    }
    if (nroSucursal === 2) {
      return 'Hibrido';
    }
  };

  saveRemito(): any {
    const remito = {
      estado: this.state.estado,
      /*       nroRemito: this.state.nroRemito,
       */ sucursalDestino: this.state.sucursal,
      tipo: this.state.tipoRemito
    };

    const productos = _.map(this.state.productos, (p) => {
      return { id: p.id, cantidad: p.cantidad };
    });

    axios
      .post('/api/remito/agregarRemito', {
        remito,
        productos
      })
      .then((res) => {
        this.setState({ ...this.state, nroRemito: res.data });
        this.show();
      });
  }

  render() {
    const { visible } = this.state;
    const tiposRemito = _.map(paramService.getTiposRemito(), (tr) => {
      return { value: tr.id.toString(), label: tr.descripcion };
    });

    const estadosRemito = _.map(paramService.getEstadosRemito(), (er) => {
      return { value: er.id.toString(), label: er.descripcion };
    });

    return (
      <div className="fullWidth">
        <div className="page-header">Crear Remito</div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                  <DatePicker
                    name="fechaRemito"
                    id="fechaRemito"
                    label="Fecha de Remito"
                    className="md-cell"
                    displayMode="portrait"
                    onChange={this.handleChangeComplex('fechaRemito')}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                  <SelectField
                    name="tipoRemito"
                    id="tipoRemito"
                    label="Tipo de Remito"
                    placeholder="Tipo de Remito"
                    className="md-cell"
                    value={this.state.tipoRemito}
                    menuItems={tiposRemito}
                    onChange={this.handleChangeComplex('tipoRemito')}
                  />
                </Cell>

                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                  <SelectField
                    name="estado"
                    id="estado"
                    label="Estado del Remito"
                    placeholder="Estado del Remito"
                    className="md-cell"
                    value={this.state.estado}
                    disabled={true}
                    menuItems={estadosRemito}
                    onChange={this.handleChangeComplex('estado')}
                  />
                </Cell>
              </Grid>
              <Grid>
                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                  <div className="sucursal-field">
                    <TextField
                      name="sucursal"
                      id="sucursal"
                      label="Sucursal"
                      value={this.sucursalMask(this.state.sucursal)}
                      disabled={true}
                    />
                    <Button
                      onClick={() => {
                        this.props.dispatch(setCurrentObject(this.state));
                        this.props.dispatch(push('/buscarSucursal'));
                      }}
                      icon
                      primary
                    >
                      search
                    </Button>
                  </div>
                </Cell>
              </Grid>
            </CardText>
          </Card>

          <Card className="md-block-centered">
            <CardTitle title="Lista de Productos" />
            <CardText>
              {this.state.productos.length !== 0 && this.renderProductos(this.state.productos)}
              {this.state.productos.length === 0 && (
                <p>Actualmente no posee Productos agregados al remito</p>
              )}
              <div className="buttons-right">
                <Button
                  onClick={() => {
                    this.props.dispatch(setCurrentObject(this.state));
                    this.props.dispatch(push('/buscarProductos'));
                  }}
                  raised
                  primary
                  iconClassName="fa fa-search"
                >
                  Buscar
                </Button>
              </div>
            </CardText>
          </Card>

          <div className="buttons-right">
            <Button
              onClick={() => {
                this.saveRemito();
              }}
              raised
              primary
              iconClassName="fa fa-save"
            >
              Guardar
            </Button>
          </div>
          <DialogContainer
            id="simple-list-dialog"
            visible={visible}
            title="Generación exitosa"
            focusOnMount={false}
            onHide={this.hide}
            actions={[
              <Button flat primary onClick={this.hide}>
                OK
              </Button>
            ]}
          >
            <p>Se ha generado el remito número: {this.state.nroRemito}</p>
          </DialogContainer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore) {
  return {
    errorMessage: state.auth.errorMessage,
    currentObj: state.form.currentObject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrearRemito);

interface PropsFromState {
  errorMessage: string;
  currentObj: object;
}

interface PropsFromDispatch {
  dispatch: Function;
}

type CrearRemitoProps = PropsFromState & PropsFromDispatch;
