import { Component } from 'react';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-md';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Dispatch } from 'redux';

class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
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
                {this.props.config.titles.map((title, i) => (
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
                    {this.props.canDeleteElement(item) && (
                      <Button
                        icon
                        primary
                        onClick={() => {
                          this.props.onDeleteItem(item);
                        }}
                      >
                        delete
                      </Button>
                    )}
                    <Button icon primary onClick={() => this.props.onEdit(item)}>
                      edit
                    </Button>
                    <Button icon primary onClick={() => this.props.onView(item)}>
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dispatch
  };
};

export default connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Table);

interface DispatchProps {
  dispatch: Dispatch;
}

interface OwnProps {
  data: object[];
  config: Config;
  onEdit: Function;
  onView: Function;
  canDeleteElement?: Function;
  onDeleteItem: Function;
}

interface Config {
  columnsToShow: string[];
  titles: string[];
}

type TableProps = DispatchProps & OwnProps;

interface TableState {
  data: object[];
}
