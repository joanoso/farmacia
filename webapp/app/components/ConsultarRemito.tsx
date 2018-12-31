import { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppStore } from '../AppStore';
import { Card, CardText, Grid, Cell, TextField, Button, SelectField } from 'react-md';
import { push } from 'connected-react-router';
import Table from './common/Table';
import { paramService } from '../service/ParamService';

class ConsultarRemito extends Component<ConsultarRemitoProps, any> {
  constructor(props) {
    super(props);
    this.state = { remitos: [] };
  }

  onSearcRemitos(): any {
    axios
      .post('/api/remito/filtered', {
        fecha: this.state.fecha,
        estado: this.state.estado,
        tipo: this.state.tipo,
        sucursalDestino: this.state.sucursalDestino
      })
      .then((res) => {
        this.setState({ ...this.state, remitos: res.data });
      });
  }

  componentDidMount() {
    /*    axios.get('/api/remito').then((res) => {
      this.setState({ ...this.state, remitos: res.data });
    }); */
  }

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = (name) => (value) => {
    this.setState({ ...this.state, [name]: value });
  };

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
    const tiposRemito = _.map(paramService.getTiposRemito(), (tr) => {
      return { value: tr.id.toString(), label: tr.descripcion };
    });

    const estadosRemito = _.map(paramService.getEstadosRemito(), (er) => {
      return { value: er.id.toString(), label: er.descripcion };
    });

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
      <div>
        <Card className="md-block-centered">
          <CardText>
            <Grid className="grid-example">
              <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                <TextField
                  name="fechaRemito"
                  id="fechaRemito"
                  label="Fecha de Remito"
                  lineDirection="center"
                  value={this.state.fechaRemito}
                  onChange={this.handleChange}
                />
              </Cell>
              <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                <SelectField
                  name="tipo"
                  id="tipo"
                  label="Tipo de Remito"
                  placeholder="Tipo de Remito"
                  className="md-cell"
                  value={this.state.tipoRemito}
                  menuItems={tiposRemito}
                  onChange={this.handleChangeComplex('tipo')}
                />
              </Cell>
              <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                <SelectField
                  name="estado"
                  id="estado"
                  label="Estado del Remito"
                  placeholder="Estado del Remito"
                  className="md-cell"
                  value={this.state.estado}
                  menuItems={estadosRemito}
                  onChange={this.handleChangeComplex('estado')}
                />
              </Cell>
              <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                <TextField
                  name="sucursalDestino"
                  id="sucursalDestino"
                  label="Nro Sucursal"
                  lineDirection="center"
                  value={this.state.sucursal}
                  onChange={this.handleChange}
                />
              </Cell>
            </Grid>
          </CardText>
        </Card>

        <Grid>
          <Cell size={12}>
            <div className="buttons-right">
              <Button
                onClick={() => {
                  this.onSearcRemitos();
                }}
                raised
                primary
                iconClassName="fa fa-search"
              >
                Buscar
              </Button>
            </div>
          </Cell>
        </Grid>

        <Card className="md-block-centered">
          <Table
            data={this.state.remitos}
            config={tableConfig}
            onEdit={onEdit}
            canDeleteElement={canDeleteElement}
            onDeleteRemito={this.onDeleteRemito}
          />
        </Card>
      </div>
    );
  };

  render() {
    return (
      <div className="fullWidth">
        <div className="page-header">Consultar Remitos</div>

        <div className="page-content">{this.renderRemitos(this.state.remitos)}</div>
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
