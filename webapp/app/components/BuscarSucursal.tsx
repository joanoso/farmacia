import { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText } from 'react-md';
import { push } from 'connected-react-router';
import SimpleSelectionTable from '../components/common/SimpleSelectionTable';
import { Dispatch } from 'redux';
import Sucursal from '../common/model/Sucursal';

class BuscarSucursal extends Component<BuscarSucursalProps, BuscarSucursalState> {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: [],
      sucursalSelected: undefined,
      numero: undefined,
      nombre: '',
      localidad: ''
    };
  }

  onSearchSucursales() {
    axios
      .post('/api/sucursales/filtered', {
        nombre: this.state.nombre,
        localidad: this.state.localidad,
        numero: this.state.numero
      })
      .then((res) => {
        this.setState({ ...this.state, sucursales: res.data });
      });
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = (name) => (value) => {
    this.setState({ ...this.state, [name]: value });
  };

  toogle = (index: number, checked: boolean, ev) => {
    const sucursales = _.cloneDeep(this.state.sucursales);

    _.forEach(sucursales, (suc) => {
      suc.selected = false;
    });

    sucursales[index - 1].selected = checked;
    this.setState({
      sucursales,
      sucursalSelected: checked ? sucursales[index - 1] : undefined
    });
  };

  tableConfig = {
    columnsToShow: ['numero', 'nombre', 'direccion', 'localidad'],
    titles: ['Número', 'Nombre', 'Dirección', 'Localidad']
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

          <div className="buttons-right">
            <Button
              onClick={() => {
                this.props.dispatch(push('/crearRemito'));
              }}
              raised
              default
            >
              Volver
            </Button>
            <Button
              onClick={() => {
                this.onSearchSucursales();
              }}
              raised
              primary
              iconClassName="fa fa-search"
            >
              Buscar
            </Button>
          </div>

          <SimpleSelectionTable
            data={this.state.sucursales}
            config={this.tableConfig}
            backPath={'/crearRemito'}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore): StateProps {
  return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dispatch
  };
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(BuscarSucursal);

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  dispatch: Function;
}

type BuscarSucursalProps = StateProps & DispatchProps;

interface BuscarSucursalState {
  sucursales: SucursalBase[];
  sucursalSelected: Sucursal;
  numero: number;
  nombre: string;
  localidad: string;
}

interface SucursalBase extends Sucursal {
  selected: boolean;
}
