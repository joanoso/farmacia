import {Component} from 'react';
import axios, {AxiosResponse} from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import {connect} from 'react-redux';
import {TextField, Button, CardTitle, DialogContainer} from 'react-md';
import {AppStore} from '../AppStore';
import {Grid, Cell} from 'react-md';
import {Card, CardText, DatePicker, SelectField} from 'react-md';
import {push} from 'connected-react-router';
import {setCurrentObject} from '../reducers/form';
import {paramService} from '../service/ParamService';
import ProductosDeRemitoTable from './common/ProductosDeRemitoTable';
import {Dispatch} from 'redux';

class CrearRemito extends Component<CrearRemitoProps, CrearRemitoState> {
    constructor(props: CrearRemitoProps) {
        super(props);

        // Chequeo si tengo currentObj
        if (props.currentObj) {
            const {estado, nroRemito, tipoRemito, sucursal, productos} = props.currentObj;
            const sucursalNew = dotProp.get(props, 'history.location.state.itemSelected.id', sucursal);
            const productosNew = dotProp.get(props, 'history.location.state.itemsSelected', []);
            _.forEach(productosNew, (p) => {
                p.cantidad = 0;
            });

            const prods = _.union(productosNew, productos) as ProductoBase[];

            this.state = {
                estado,
                nroRemito,
                tipoRemito,
                sucursal: sucursalNew,
                productos: prods,
                isViewOnly: false,
                visible: false
            };
        } else {
            // Puede ser Edito o nuevo, si tengo element es edit

            const element = dotProp.get(props, 'history.location.state.element', undefined);

            if (dotProp.get(props, 'history.location.state.element', undefined) !== undefined) {
                const {estado, id, sucursalDestino, tipo, detallesRemito} = element;

                const isViewOnly = dotProp.get(props, 'history.location.state.isViewOnly', false);

                const prods = _.map(detallesRemito, (dr) => {
                    return {
                        cantidad: dr.cantidad,
                        id: dr.producto.id,
                        marca: dr.producto.marca,
                        descripcion: dr.producto.descripcion
                    };
                });

                this.state = {
                    estado: estado.toString(),
                    nroRemito: id,
                    isViewOnly,
                    sucursal: sucursalDestino,
                    tipoRemito: tipo.toString(),
                    productos: prods,
                    visible: false
                };
            } else {
                this.state = {
                    estado: '1',
                    nroRemito: undefined,
                    sucursal: undefined,
                    tipoRemito: '',
                    productos: [],
                    isViewOnly: false,
                    visible: false
                };
            }
        }
    }

    show = () => {
        this.setState({...this.state, visible: true});
    };

    hide = () => {
        this.setState({...this.state, visible: false});
        this.props.dispatch(push('/'));
    };

    handleChange = (value, event) => {
        this.setState({...this.state, [event.target.name]: value});
    };

    handleChangeComplex = (name) => (value) => {
        this.setState({...this.state, [name]: value});
    };

    handleProductChange = (item) => (value, event) => {
        const productos = _.cloneDeep(this.state.productos);
        const prodModified = _.find(productos, (p) => {
            return p.id === item.id;
        });

        prodModified.cantidad = value;

        this.setState({...this.state, productos});
    };

    renderProductos = (prods) => {
        const tableConfig = {
            columnsToShow: ['id', 'descripcion', 'marca'],
            titles: ['ID', 'Descripción', 'Marca']
        };
        return (
            <ProductosDeRemitoTable
                data={prods}
                config={tableConfig}
                changeCantidad={this.handleProductChange}
            />
        );
    };

    sucursalMask = (nroSucursal: number) => {
        const sucursalNew = dotProp.get(this.props, 'history.location.state.itemSelected.nombre');
        return sucursalNew;
    };

    saveRemito(): any {
        const remito = {
            estado: this.state.estado,
            /*       nroRemito: this.state.nroRemito,
             */ sucursalDestino: this.state.sucursal,
            id: this.state.nroRemito,
            tipo: this.state.tipoRemito
        };

        const productos = _.map(this.state.productos, (p) => {
            return {id: p.id, cantidad: p.cantidad};
        });

        axios
            .post('/api/remito/agregarRemito', {
                remito,
                productos
            })
            .then((res) => {
                this.setState({...this.state, nroRemito: res.data});
                this.show();
            });
    }

    render() {
        const {visible, isViewOnly, nroRemito} = this.state;
        const {idSucursal} = this.props;
        const isEdit = this.state.nroRemito !== undefined;
        let tiposRemito = _.map(paramService.getTiposRemito(), (tr) => {
            return {value: tr.id.toString(), label: tr.descripcion};
        });

        if (idSucursal === 1) {
            // Solo permitimos simple
            tiposRemito = _.filter(tiposRemito, (tr) => {
                return tr.value === '1';
            });
        }

        let estadosRemito = _.map(paramService.getEstadosRemito(), (er) => {
            return {value: er.id.toString(), label: er.descripcion};
        });

        if (!nroRemito) {
            estadosRemito = _.filter(estadosRemito, (er) => {
                return er.value === '1';
            });
        }

        return (
            <div className="fullWidth">
                <div className="page-header">Crear Remito</div>

                <div className="page-content">
                    <Card className="md-block-centered">
                        <CardText>
                            <Grid className="grid-example" spacing={70} gutter={70}>
                                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                                    <DatePicker
                                        name="fechaRemito"
                                        id="fechaRemito"
                                        label="Fecha de Remito"
                                        className="md-cell"
                                        displayMode="portrait"
                                        disabled={isViewOnly}
                                        onChange={this.handleChangeComplex('fechaRemito')}
                                    />
                                </Cell>
                                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                                    <SelectField
                                        name="tipoRemito"
                                        id="tipoRemito"
                                        label="Tipo de Remito"
                                        placeholder="Tipo de Remito"
                                        className="md-cell"
                                        value={this.state.tipoRemito}
                                        disabled={isViewOnly}
                                        menuItems={tiposRemito}
                                        onChange={this.handleChangeComplex('tipoRemito')}
                                    />
                                </Cell>

                                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                                    <SelectField
                                        name="estado"
                                        id="estado"
                                        label="Estado del Remito"
                                        placeholder="Estado del Remito"
                                        className="md-cell"
                                        value={this.state.estado}
                                        disabled={isViewOnly}
                                        menuItems={estadosRemito}
                                        onChange={this.handleChangeComplex('estado')}
                                    />
                                </Cell>
                                <Cell phoneSize={4} tabletSize={8} desktopSize={4}>
                                    <div className="sucursal-field">
                                        <TextField
                                            name="sucursal"
                                            id="sucursal"
                                            label="Sucursal"
                                            value={this.sucursalMask(this.state.sucursal)}
                                            disabled={true}
                                        />
                                        {!isViewOnly && (
                                            <div className="lupa-div">
                                                <Button
                                                    onClick={() => {
                                                        this.props.dispatch(setCurrentObject(this.state));
                                                        this.props.dispatch(push('/seleccionarSucursal'));
                                                    }}
                                                    icon
                                                    primary
                                                >
                                                    search
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Cell>
                            </Grid>
                            {/* <Grid>
               
              </Grid> */}
                        </CardText>
                    </Card>

                    <Card className="md-block-centered">
                        <CardTitle title="Lista de Productos"/>
                        <CardText>
                            {this.state.productos.length !== 0 && this.renderProductos(this.state.productos)}
                            {this.state.productos.length === 0 && (
                                <p>Actualmente no posee Productos agregados al remito</p>
                            )}
                            {!isViewOnly && (
                                <div className="buttons-right">
                                    <Button
                                        onClick={() => {
                                            this.props.dispatch(setCurrentObject(this.state));
                                            this.props.dispatch(
                                                push('/buscarProductos', {productsAlreadyAdded: this.state.productos})
                                            );
                                        }}
                                        raised
                                        primary
                                        iconClassName="fa fa-search"
                                    >
                                        Buscar
                                    </Button>
                                </div>
                            )}
                        </CardText>
                    </Card>

                    <div className="buttons-right">
                        <Button
                            className="test"
                            onClick={() => {
                                this.saveRemito();
                            }}
                            raised
                            primary
                            iconClassName="fa fa-save"
                        >
                            Guardar
                        </Button>
                    </div>
                    <DialogContainer
                        id="simple-list-dialog"
                        visible={visible}
                        title="Generación exitosa"
                        focusOnMount={false}
                        onHide={this.hide}
                        actions={[
                            <Button flat primary onClick={this.hide}>
                                OK
                            </Button>
                        ]}
                    >
                        <p>Se ha generado el remito número: {this.state.nroRemito}</p>
                    </DialogContainer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        errorMessage: state.auth.errorMessage,
        currentObj: state.form.currentObject,
        idSucursal: state.auth.user.idSucursal
    };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        dispatch
    };
};

export default connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(CrearRemito);

interface StateProps {
    errorMessage: string;
    currentObj: any;
    idSucursal: number;
}

interface DispatchProps {
    dispatch: Dispatch;
}

type CrearRemitoProps = StateProps & DispatchProps;

interface CrearRemitoState {
    estado: string;
    nroRemito: string;
    tipoRemito: string;
    sucursal: number;
    productos: ProductoBase[];
    visible: boolean;
    isViewOnly: boolean;
}

interface ProductoBase {
    id: number;
    cantidad: number;
}
