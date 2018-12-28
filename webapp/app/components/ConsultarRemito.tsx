import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppStore } from '../AppStore';
import { Card } from 'react-md';
import { push } from 'connected-react-router';
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

  onDeleteRemito = (item) => {
    axios.post('/api/remito/eliminarRemito', { id: item.id }).then((res) => {
      const remitos = _.cloneDeep(this.state.remitos);
      const remitosNew = _.filter(remitos, (rem) => {
        return rem.id !== item.id;
      });

      this.setState({ ...this.state, remitos: remitosNew });
    });
  };

  renderRemitos = (remitos) => {
    const tableConfig = {
      columnsToShow: ['id', 'tipo', 'estado'],
      titles: ['Número', 'Tipo', 'Estado']
    };

    const onEdit = (element) => {
      this.props.dispatch(push('/crearRemito', { element }));
    };

    const canDeleteElement = (el) => {
      return el.estado === 0 || el.estado === 1;
    };

    return (
      <Table
        data={this.state.remitos}
        config={tableConfig}
        onEdit={onEdit}
        canDeleteElement={canDeleteElement}
        onDeleteRemito={this.onDeleteRemito}
      />
    );
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
