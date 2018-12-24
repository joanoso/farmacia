import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../../AppStore';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

class TableList extends Component<TableListProps, TableListState> {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  componentDidUpdate(prevProps: TableListProps) {
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
                {this.props.config.titles.map((title: string, i: number) => (
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

function mapStateToProps(state: AppStore) {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList);

interface PropsFromState {}

interface PropsFromDispatch {
  dispatch: Function;
}

interface InjectedProps {
  data: any[];
  config: Config;
  changeCantidad: (item: any) => (value: number, ev) => void;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type TableListProps = PropsFromState & PropsFromDispatch & InjectedProps;

interface TableListState {
  data: any[];
}
