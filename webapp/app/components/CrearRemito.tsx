import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, DatePicker, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import { setCurrentObject } from '../reducers/form';

class CrearRemito extends Component<CrearRemitoProps, any> {
  constructor(props) {
    super(props);

    // Chequeo si tengo currentObj
    if (props.currentObj) {
      const { estado, nroRemito, sucursal, tipoRemito } = props.currentObj;
      this.state = { estado, nroRemito, sucursal, tipoRemito }
      const sucursalNew = dotProp.get(props, 'history.location.state.id', undefined);
      const productos = dotProp.get(props, 'history.location.state.productos', []);

      this.state = { ...this.state, sucursal: sucursalNew, productos }
    } else {
      this.state = { estado: '', nroRemito: '', sucursal: '', tipoRemito: '' , productos: []}
    }


    //this.state = { estado: 'pendiente', nroRemito: '45622224', sucursal };
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = name => value => {
    this.setState({ ...this.state, [name]: value });
  };

  OBJECT_ITEMS = [
    {
      label: 'Simple',
      value: 'simple'
    },
    {
      label: 'Complejo',
      value: 'complejo'
    }
  ];

  OBJECT_ITEMS_REMITO = [
    {
      label: 'Borrador',
      value: 'borrador'
    },
    {
      label: 'Pendiente',
      value: 'pendiente'
    }
  ];

  renderProductos = (prods) => {
     return prods.map(p => {
      return (<div>{p.id}</div>)
    })
  }

  sucursalMask = (nroSucursal: number) => {
    if (nroSucursal == null) return undefined;
    if (nroSucursal === 1) return "Lalala";
    if (nroSucursal === 2) return "Hibrido";
  }

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Crear Remito</div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={8} desktopSize={3}>
                  <TextField
                    name="nroRemito"
                    id="nroRemito"
                    label="Número de remito"
                    lineDirection="center"
                    value={this.state.nroRemito}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={3}>
                  <DatePicker
                    name="fechaRemito"
                    id="fechaRemito"
                    label="Fecha de Remito"
                    className="md-cell"
                    displayMode="portrait"
                    onChange={this.handleChangeComplex('fechaRemito')}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={3}>
                  <SelectField
                    name="tipoRemito"
                    id="tipoRemito"
                    label="Tipo de Remito"
                    placeholder="Tipo de Remito"
                    className="md-cell"
                    value={this.state.tipoRemito}
                    menuItems={this.OBJECT_ITEMS}
                    onChange={this.handleChangeComplex('tipoRemito')}
                  />
                </Cell>

                <Cell phoneSize={4} tabletSize={8} desktopSize={3}>
                  <SelectField
                    name="estado"
                    id="estado"
                    label="Estado del Remito"
                    placeholder="Estado del Remito"
                    className="md-cell"
                    defaultValue={'pendiente'}
                    disabled={true}
                    menuItems={this.OBJECT_ITEMS_REMITO}
                    onChange={this.handleChangeComplex('estado')}
                  />
                </Cell>
              </Grid>
              <Grid>
                <Cell phoneSize={4} tabletSize={8} desktopSize={3}>
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
                    raised
                    primary
                    iconClassName="fa fa-search"
                  >
                    Buscar
                  </Button>
                </Cell>
              </Grid>
            </CardText>
          </Card>
          <Button
                    onClick={() => {
                      this.props.dispatch(setCurrentObject(this.state));
                      this.props.dispatch(push('/buscarProductos'));
                    }}
                    raised
                    primary
                    iconClassName="fa fa-search"
                  >
                    Buscar Productos
                  </Button>
                  {this.renderProductos(this.state.productos)}
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

const mapDispatchToProps = dispatch => {
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
  login: Function;
}

type CrearRemitoProps = PropsFromState & PropsFromDispatch;
