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

class MultiSelectionTable extends Component<MultiSelectionTableProps, MultiSelectionTableState> {
  constructor(props) {
    super(props);
    this.state = { data: props.data, itemsSelected: [] };
  }

  componentDidUpdate(prevProps: MultiSelectionTableProps) {
    const currentData = this.props.data;
    if (currentData !== prevProps.data) {
      this.setState({ data: currentData });
    }
  }

  toogle = (index: number, checked: boolean, ev) => {
    const data = _.cloneDeep(this.state.data) as Data[];
    data[index - 1].selected = checked;

    const itemsSelected = _.filter(data, (it: Data) => {
      return it.selected;
    });

    this.setState({
      data,
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
                {this.state.data.map((item: Data, i: number) => (
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
                    productos: this.state.itemsSelected
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
)(MultiSelectionTable);

interface PropsFromState {}

interface PropsFromDispatch {
  dispatch: Function;
}

interface InjectedProps {
  data: Data[];
  config: Config;
  backPath: string;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type MultiSelectionTableProps = PropsFromState & PropsFromDispatch & InjectedProps;

interface MultiSelectionTableState {
  data: Data[];
  itemsSelected: object[];
}

interface Data {
  selected: boolean;
}
