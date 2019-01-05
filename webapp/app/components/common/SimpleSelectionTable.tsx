import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-md';
import { Grid, Cell } from 'react-md';
import { Card } from 'react-md';
import { push } from 'connected-react-router';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Dispatch } from 'redux';

class SimpleSelectionTable extends Component<SimpleSelectionTableProps, SimpleSelectionTableState> {
  constructor(props: SimpleSelectionTableProps) {
    super(props);
    this.state = { data: props.data as Data[], itemSelected: undefined };
  }

  componentDidUpdate(prevProps: SimpleSelectionTableProps) {
    const currentData = this.props.data;
    if (currentData !== prevProps.data) {
      this.setState({ data: currentData as Data[] });
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dispatch
  };
};

export default connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(SimpleSelectionTable);

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

type SimpleSelectionTableProps = DispatchProps & OwnProps;

interface SimpleSelectionTableState {
  data: Data[];
  itemSelected: Data;
}

interface Data {
  selected: boolean;
}
