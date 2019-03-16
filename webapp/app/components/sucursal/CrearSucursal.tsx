import { Component } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import { connect } from 'react-redux';
import { TextField, Button, DialogContainer } from 'react-md';
import { Grid, Cell } from 'react-md';
import { Card, CardText } from 'react-md';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import Sucursal from '../../common/model/Sucursal';
import { AppStore } from '../../AppStore';

class CrearSucursal extends Component<CrearSucursalProps, CrearSucursalState> {
  constructor(props) {
    super(props);

    const element = dotProp.get(props, 'history.location.state.element', undefined);

    if (dotProp.get(props, 'history.location.state.element', undefined) !== undefined) {
      const { numero, id, nombre, direccion, localidad } = element;

      const isViewOnly = dotProp.get(props, 'history.location.state.isViewOnly', false);

      this.state = {
        numero,
        nombre,
        localidad,
        direccion,
        id,
        isViewOnly,
        visible: false,
        error: '',
        isEdit: true
      };
    } else {
      this.state = {
        numero: undefined,
        nombre: undefined,
        localidad: undefined,
        direccion: undefined,
        id: undefined,
        isViewOnly: false,
        visible: false,
        error: '',
        isEdit: false
      };
    }
  }

  show = () => {
    this.setState({ ...this.state, visible: true });
  };

  hide = () => {
    this.setState({ ...this.state, visible: false });
    this.props.dispatch(push('/'));
  };

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleChangeComplex = (name) => (value) => {
    this.setState({ ...this.state, [name]: value });
  };

  agregarSucursal = () => {
    const sucursal = {
      numero: this.state.numero,
      nombre: this.state.nombre,
      direccion: this.state.direccion,
      localidad: this.state.localidad,
      id: this.state.id
    };

    axios
      .post('/api/sucursales/agregarSucursal', {
        sucursal
      })
      .then((res) => {
        this.show();
      })
      .catch((err: AxiosError) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  render() {
    const { isEdit, isViewOnly, numero, nombre, direccion, localidad } = this.state;
    const canSave = !_.isNil(numero) && !_.isNil(nombre) && !_.isNil(direccion) && !_.isNil(localidad);
    return (
      <div className="fullWidth">
        <div className="page-header">
          {isEdit ? (isViewOnly ? 'Ver Sucursal' : 'Editar Sucursal') : 'Crear Sucursal'}
        </div>

        <div className="page-content">
          <Card className="md-block-centered">
            <CardText>
              <Grid className="grid-example">
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="numero"
                    id="numero"
                    label="Número de sucursal"
                    lineDirection="center"
                    value={this.state.numero}
                    onChange={this.handleChange}
                    disabled={isViewOnly}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="nombre"
                    id="nombre"
                    label="Nombre"
                    lineDirection="center"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                    disabled={isViewOnly}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="localidad"
                    id="localidad"
                    label="Localidad"
                    lineDirection="center"
                    value={this.state.localidad}
                    onChange={this.handleChange}
                    disabled={isViewOnly}
                  />
                </Cell>
                <Cell phoneSize={4} tabletSize={8} desktopSize={12}>
                  <TextField
                    name="direccion"
                    id="direccion"
                    label="Dirección"
                    lineDirection="center"
                    value={this.state.direccion}
                    onChange={this.handleChange}
                    disabled={isViewOnly}
                  />
                </Cell>
              </Grid>
            </CardText>
          </Card>

          <div className="buttons-right">
            <Button
              onClick={() => {
                this.props.dispatch(push('/buscarSucursal'));
              }}
              raised
              default
            >
              Volver
            </Button>
            {!isViewOnly && (
              <Button
                disabled={!canSave}
                onClick={() => {
                  this.agregarSucursal();
                }}
                raised
                primary
                iconClassName="fa fa-plus"
              >
                {isEdit ? 'Guardar' : 'Crear'}
              </Button>
            )}
          </div>

          {this.state.error && (
            <div className="error-panel">
              <p>{this.state.error}</p>
            </div>
          )}
        </div>
        <DialogContainer
          id="simple-list-dialog"
          visible={this.state.visible}
          title="Generación exitosa"
          focusOnMount={false}
          onHide={this.hide}
          actions={[
            <Button flat primary onClick={this.hide}>
              OK
            </Button>
          ]}
        >
          <p>
            {isEdit
              ? 'Se ha guardado la sucursal exitosamente'
              : 'Se ha generado la sucursal exitosamente'}
          </p>
        </DialogContainer>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore): StateProps {
  return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dispatch
  };
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(CrearSucursal);

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  dispatch: Function;
}

type CrearSucursalProps = StateProps & DispatchProps;

interface CrearSucursalState {
  numero: number;
  nombre: string;
  localidad: string;
  direccion: string;
  visible: boolean;
  id: number;
  error: string;
  isEdit: boolean;
  isViewOnly: boolean;
}

interface SucursalBase extends Sucursal {
  selected: boolean;
}
