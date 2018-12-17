import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, DatePicker, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from 'react-md';

class BuscarSucursal extends Component<BuscarSucursalProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: [
        {
          numero: '001',
          nombre: 'Pepe',
          selected: false
        },
        {
          numero: '003',
          nombre: 'Pepapa',
          selected: false
        }
      ],
      sucursalSelected: undefined
    };
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = name => value => {
    this.setState({ ...this.state, [name]: value });
  };

  toogle = (index, checked, ev) => {
    const sucursales = _.cloneDeep(this.state.sucursales);

    _.forEach(sucursales, suc => {
      suc.selected = false;
    });

    sucursales[index - 1].selected = checked;
    this.setState({
      sucursales,
      sucursalSelected: checked ? sucursales[index - 1] : undefined
    });
  };

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

          <Grid>
            <Cell size={12}>
              <div className="buttons-right">
                <Button
                  onClick={() => {
                    this.props.dispatch(push('/buscarSucursal'));
                  }}
                  raised
                  default
                >
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
              </div>
            </Cell>
          </Grid>

          <Card className="md-block-centered">
            <DataTable
              baseId="simple-selectable-table"
              indeterminate
              /*               onRowToggle={this.toogle}
               */
            >
              <TableHeader>
                <TableRow>
                  <TableColumn grow>Lorem 1</TableColumn>
                  <TableColumn>Lorem 2</TableColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.sucursales.map((item, i) => (
                  <TableRow
                    key={i}
                    selected={item.selected}
                    onCheckboxClick={this.toogle}
                  >
                    <TableColumn>{item.numero}</TableColumn>
                    <TableColumn>{item.nombre}</TableColumn>
                  </TableRow>
                ))}
              </TableBody>
            </DataTable>
          </Card>

          <Grid>
            <Cell size={12}>
              <div className="buttons-right">
                <Button
                  onClick={() => {
                    this.props.dispatch(
                      push('/crearRemito', this.state.sucursalSelected)
                    );
                  }}
                  raised
                  primary
                  disabled={!this.state.sucursalSelected}
                >
                  Seleccionar
                </Button>
              </div>
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
