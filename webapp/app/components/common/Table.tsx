import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../../AppStore';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

class Table extends Component<TableProps, TableState> {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  componentDidUpdate(prevProps: TableProps) {
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
                <TableColumn>Acciones</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.data.map((item, i) => (
                <TableRow key={i}>
                  {this.props.config.columnsToShow.map((c, i) => (
                    <TableColumn key={i}>{item[c]}</TableColumn>
                  ))}
                  <TableColumn>
                    <Button icon primary>
                      delete
                    </Button>
                    <Button icon primary onClick={() => this.props.onEdit(item)}>
                      edit
                    </Button>
                    <Button icon primary>
                      visibility
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
)(Table);

interface PropsFromState {}

interface PropsFromDispatch {
  dispatch: Function;
}

interface InjectedProps {
  data: any[];
  config: Config;
  onEdit: Function;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type TableProps = PropsFromState & PropsFromDispatch & InjectedProps;

interface TableState {
  data: any[];
}
