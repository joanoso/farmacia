import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button } from 'react-md';
import { AppStore } from '../AppStore';
import { Grid, Cell } from 'react-md';
import { Card, CardText, DatePicker, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import { setCurrentObject } from '../reducers/form';
import { paramService } from '../service/ParamService';
import MultiSelectionTable from './common/MultiSelectionTable';
import TableList from './common/TableList';
import Table from './common/Table';

class ConsultarRemito extends Component<ConsultarRemitoProps, any> {
  constructor(props) {
    super(props);
    this.state = { remitos: [] };
  }

  componentDidMount() {
    axios.get('/api/remito').then((res) => {
      this.setState({ ...this.state, remitos: res.data });
    });
  }

  renderRemitos = (remitos) => {
    const tableConfig = {
      columnsToShow: ['id', 'tipo', 'estado'],
      titles: ['Número', 'Tipo', 'Estado']
    };

    const onEdit = (element) => {
      this.props.dispatch(push('/crearRemito', { element }));
    };

    return <Table data={this.state.remitos} config={tableConfig} onEdit={onEdit} />;
  };

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Consultar Remitos</div>

        <div className="page-content">
          <Card className="md-block-centered">{this.renderRemitos(this.state.remitos)}</Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultarRemito);

interface PropsFromState {
  errorMessage: string;
}

interface PropsFromDispatch {
  dispatch: Function;
}

type ConsultarRemitoProps = PropsFromState & PropsFromDispatch;
