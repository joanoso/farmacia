import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../../AppStore';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Dispatch } from 'redux';

class ProductosDeRemitoTable extends Component<ProductosProps, ProductosState> {
  constructor(props: ProductosProps) {
    super(props);
    this.state = { data: props.data };
  }

  componentDidUpdate(prevProps: ProductosProps) {
    const currentData = this.props.data;
    if (currentData !== prevProps.data) {
      this.setState({ data: currentData });
    }
  }

  render() {
    if (this.props.data.length === 0) {
      return null;
    } else {
      return (
        <div className="fullWidth">
          <DataTable plain>
            <TableHeader>
              <TableRow>
                {this.props.config.titles.map((title, i) => (
                  <TableColumn key={i}>{title}</TableColumn>
                ))}
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Eliminar</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.data.map((item, i) => (
                <TableRow key={i}>
                  {this.props.config.columnsToShow.map((c, i) => (
                    <TableColumn key={i}>{item[c]}</TableColumn>
                  ))}
                  <TableColumn className="custom-table-input">
                    <TextField
                      name="nroRemito"
                      id="nroRemito"
                      lineDirection="center"
                      value={item['cantidad']}
                      onChange={this.props.changeCantidad(item)}
                    />
                  </TableColumn>
                  <TableColumn>
                    <Button icon primary>
                      delete
                    </Button>
                  </TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dispatch
  };
};

export default connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ProductosDeRemitoTable);

interface DispatchProps {
  dispatch: Function;
}

interface OwnProps {
  data: object[];
  config: Config;
  changeCantidad: (item: object) => (value: number, ev) => void;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type ProductosProps = DispatchProps & OwnProps;

interface ProductosState {
  data: object[];
}
