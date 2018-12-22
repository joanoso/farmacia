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
import MultiSelectionTable from "../components/common/MultiSelectionTable"

class BuscarProducto extends Component<BuscarProductoProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productosSelected: undefined
    };
  }

  onSearchProductos() {
    const prods =  [{ id: 1, descripcion: "Caja Verde", marca: "Duradura" },
    { id: 2, descripcion: "Caja Roja", marca: "Palo Santo" }]

    this.setState({ ...this.state, productos: prods })
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = name => value => {
    this.setState({ ...this.state, [name]: value });
  };

  tableConfig = {
    columnsToShow: ["id", "descripcion", "marca"],
    titles: ["ID", "Descripción", "Marca"]
  };

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Buscar Producto</div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
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

          <MultiSelectionTable data={this.state.productos}
            config={this.tableConfig}
          />
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
)(BuscarProducto);

interface PropsFromState {
  errorMessage: string;
}

interface PropsFromDispatch {
  dispatch: Function;
  login: Function;
}

type BuscarProductoProps = PropsFromState & PropsFromDispatch;