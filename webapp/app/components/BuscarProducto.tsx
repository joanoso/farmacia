import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import MultiSelectionTable from '../components/common/MultiSelectionTable';

class BuscarProducto extends Component<BuscarProductoProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productosSelected: undefined
    };
  }

  onSearchProductos() {
    axios.get(`/api/productos/${this.state.searchValue}/${this.state.descripcion}`).then((res) => {
      this.setState({ ...this.state, productos: res.data });
    });
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = (name) => (value) => {
    this.setState({ ...this.state, [name]: value });
  };

  tableConfig = {
    columnsToShow: ['id', 'descripcion', 'marca'],
    titles: ['ID', 'Descripción', 'Marca']
  };

  searchValues = [
    { value: 'descripcion', label: 'Descripcion' },
    { value: 'marca', label: 'Marca' },
    { value: 'monodroga', label: 'Monodroga' }
  ];

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Buscar Producto</div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={2} desktopSize={4}>
                  <SelectField
                    name="searchValue"
                    id="searchValue"
                    label="Campo de Busqueda"
                    className="md-cell"
                    value={this.state.searchValue}
                    menuItems={this.searchValues}
                    onChange={this.handleChangeComplex('searchValue')}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={6} desktopSize={8}>
                  <TextField
                    name="descripcion"
                    id="descripcion"
                    label="Descripción de Producto"
                    lineDirection="center"
                    value={this.state.descripcion}
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
                    this.props.dispatch(push('/crearRemito'));
                  }}
                  raised
                  default
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    this.onSearchProductos();
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

          <MultiSelectionTable
            data={this.state.productos}
            config={this.tableConfig}
            backPath={'/crearRemito'}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore) {
  return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuscarProducto);

interface PropsFromState {
  errorMessage: string;
}

interface PropsFromDispatch {
  dispatch: Function;
  login: Function;
}

type BuscarProductoProps = PropsFromState & PropsFromDispatch;
