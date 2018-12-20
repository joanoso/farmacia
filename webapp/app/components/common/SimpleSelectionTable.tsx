import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../../AppStore';
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

class SimpleSelectionTable extends Component<SimpleSelectionTableProps, any> {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentData = this.props.data;
    if (currentData !== this.state.data) {
      this.setState({ data: currentData })
    }
  }

  toogle = (index, checked, ev) => {
    const data = _.cloneDeep(this.state.data);

    _.forEach(data, item => {
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
            <DataTable
              baseId="simple-selectable-table"
              indeterminate>
              <TableHeader>
                <TableRow>
                  {this.props.config.titles.map((title, i) => (
                    <TableColumn>{title}</TableColumn>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.data.map((item, i) => (
                  <TableRow
                    key={i}
                    selected={item.selected}
                    onCheckboxClick={this.toogle}
                  >
                    {this.props.config.columnsToShow.map((c, i) => (
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
                      push('/crearRemito', this.state.itemSelected)
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

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleSelectionTable);

interface PropsFromState {

}

interface PropsFromDispatch {
  dispatch: Function;
}

interface InjectedProps {
  data: any[];
  config: Config;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type SimpleSelectionTableProps = PropsFromState & PropsFromDispatch & InjectedProps;