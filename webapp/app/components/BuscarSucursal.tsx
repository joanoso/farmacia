import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, DatePicker, SelectField } from 'react-md';
import { push } from 'connected-react-router';

class BuscarSucursal extends Component<BuscarSucursalProps, any> {
  constructor(props) {
    super(props);
    this.state = { estado: 'pendiente', nroRemito: '4564' };
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

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Buscar Sucursal</div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="numero"
                    id="numero"
                    label="Número de sucursal"
                    lineDirection="center"
                    value={this.state.numero}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="nombre"
                    id="nombre"
                    label="Nombre"
                    lineDirection="center"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="localidad"
                    id="localidad"
                    label="Localidad"
                    lineDirection="center"
                    value={this.state.localidad}
                    onChange={this.handleChange}
                  />
                </Cell>
              </Grid>
            </CardText>
          </Card>

          <Grid >
            <Cell offset={10} size={2} >
            <Button
                onClick={() => {
                  this.props.dispatch(push('/buscarSucursal'));
                }}
                raised
                default>
                Cancelar
              </Button>
              <Button
                onClick={() => {
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore) {
  return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuscarSucursal);

interface PropsFromState {
  errorMessage: string;
}

interface PropsFromDispatch {
  dispatch: Function;
  login: Function;
}

type BuscarSucursalProps = PropsFromState & PropsFromDispatch;
