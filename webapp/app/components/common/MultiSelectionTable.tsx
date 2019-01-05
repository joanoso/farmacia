import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-md';
import { AppStore } from '../../AppStore';
import { Grid, Cell } from 'react-md';
import { Card } from 'react-md';
import { push } from 'connected-react-router';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Dispatch } from 'redux';

class MultiSelectionTable extends Component<MultiSelectionTableProps, MultiSelectionTableState> {
  constructor(props: MultiSelectionTableProps) {
    super(props);
    this.state = { dataTable: props.data as Data[], itemsSelected: [] };
  }

  componentDidUpdate(prevProps: MultiSelectionTableProps) {
    const currentData = this.props.data;
    if (currentData !== prevProps.data) {
      this.setState({ dataTable: currentData as Data[] });
    }
  }

  toogle = (index: number, checked: boolean, ev) => {
    const data = _.cloneDeep(this.state.dataTable) as Data[];
    data[index - 1].selected = checked;

    const itemsSelected = _.filter(data, (it) => {
      return it.selected;
    });

    this.setState({
      dataTable: data,
      itemsSelected
    });
  };

  render() {
    if (this.props.data.length === 0) {
      return null;
    } else {
      return (
        <div className="fullWidth">
          <Card className="md-block-centered">
            <DataTable baseId="simple-selectable-table" indeterminate>
              <TableHeader>
                <TableRow>
                  {this.props.config.titles.map((title: string, i: number) => (
                    <TableColumn key={i}>{title}</TableColumn>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.dataTable.map((item: Data, i: number) => (
                  <TableRow key={i} selected={item.selected} onCheckboxClick={this.toogle}>
                    {this.props.config.columnsToShow.map((c: string, i: number) => (
                      <TableColumn key={i}>{item[c]}</TableColumn>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </DataTable>
          </Card>
          <div className="buttons-right">
            <Button
              onClick={() => {
                this.props.dispatch(
                  push(this.props.backPath, {
                    itemsSelected: this.state.itemsSelected
                  })
                );
              }}
              raised
              primary
            >
              Seleccionar
            </Button>
          </div>
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
)(MultiSelectionTable);

interface DispatchProps {
  dispatch: Dispatch;
}

interface OwnProps {
  data: object[];
  config: Config;
  backPath: string;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type MultiSelectionTableProps = DispatchProps & OwnProps;

interface MultiSelectionTableState {
  dataTable: Data[];
  itemsSelected: object[];
}

interface Data {
  selected: boolean;
}
