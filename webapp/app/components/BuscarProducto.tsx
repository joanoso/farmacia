import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import * as dotProp from 'dot-prop-immutable';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import Producto from '../common/model/Producto';
import { Grid, Cell } from 'react-md';
import { Card, CardText, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import MultiSelectionTable from '../components/common/MultiSelectionTable';
import { Dispatch } from 'redux';

class BuscarProducto extends Component<BuscarProductoProps, BuscarProductoState> {
  constructor(props: BuscarProductoProps) {
    super(props);
    const productsToSkip = dotProp.get(props, 'history.location.state.productsAlreadyAdded', []);
    this.state = {
      productos: [],
      productsToSkip,
      descripcion: '',
      searchValue: ''
    };
  }

  onSearchProductos() {
    const { searchValue, descripcion } = this.state;
    let url = '/api/productos/';

    if (searchValue !== '' && descripcion !== '') {
      url = `/api/productos/${this.state.searchValue}/${this.state.descripcion}`;
    }

    axios.get(url).then((res: AxiosResponse<Producto[]>) => {
      const prods = _.filter(res.data, (producto) => {
        return (
          _.find(this.state.productsToSkip, (el) => {
            return el.id === producto.id;
          }) === undefined
        );
      });

      this.setState({ ...this.state, productos: prods });
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
)(BuscarProducto);

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  dispatch: Function;
}

type BuscarProductoProps = StateProps & DispatchProps;

interface BuscarProductoState {
  productos: Producto[];
  productsToSkip: Producto[];
  descripcion: string;
  searchValue: string;
}
