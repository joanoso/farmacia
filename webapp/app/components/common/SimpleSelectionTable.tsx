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

class SimpleSelectionTable extends Component<SimpleSelectionTableProps, SimpleSelectionTableState> {
  constructor(props) {
    super(props);
    this.state = { data: props.data, itemSelected: undefined };
  }

  componentDidUpdate(prevProps: SimpleSelectionTableProps) {
    const currentData = this.props.data;
    if (currentData !== prevProps.data) {
      this.setState({ data: currentData });
    }
  }

  toogle = (index: number, checked: boolean, ev) => {
    const data = _.cloneDeep(this.state.data);

    _.forEach(data, (item) => {
      item.selected = false;
    });

    data[index - 1].selected = checked;
    this.setState({
      data,
      itemSelected: checked ? data[index - 1] : undefined
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
                  {this.props.config.titles.map((title, i) => (
                    <TableColumn>{title}</TableColumn>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.data.map((item, i: number) => (
                  <TableRow key={i} selected={item.selected} onCheckboxClick={this.toogle}>
                    {this.props.config.columnsToShow.map((c: string, i: number) => (
                      <TableColumn>{item[c]}</TableColumn>
                    ))}
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
                      push(this.props.backPath, {
                        itemSelected: this.state.itemSelected
                      })
                    );
                  }}
                  raised
                  primary
                  disabled={!this.state.itemSelected}
                >
                  Seleccionar
                </Button>
              </div>
            </Cell>
          </Grid>
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
)(SimpleSelectionTable);

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

type SimpleSelectionTableProps = PropsFromState & PropsFromDispatch & InjectedProps;

interface SimpleSelectionTableState {
  data: Data[];
  itemSelected: Data;
}

interface Data {
  selected: boolean;
}
