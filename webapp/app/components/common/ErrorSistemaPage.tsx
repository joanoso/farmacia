import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
// import { goBack, push } from "react-router-redux";

interface StateProps {
    error: any;
    back?: any;
}

interface DispatchProps {
    dispatch?: () => any;
}

class ErrorSistemaPage extends Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <p>
                            Se produjo un error inesperado. Por favor, volvé a ingresar en
                            unos minutos.
                        </p>
                    </div>
                    <div>
                        <p>
                            Si el inconveniente persiste, comunicate con el Centro de
                            Información Telefónica al 0810-999-2347 o bien envianos una
                            <a
                                className="btn  btn-link btn-sm"
                                href="http://www.afip.gob.ar/consultas/"
                            >
                                Consultas Web
                            </a>
                            .
                        </p>
                    </div>
                </div>
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        Información para solucionar el problema
                    </div>
                    <div className="panel-body">
            <textarea className="form-control" rows={25}>
              {this.props.error}
            </textarea>
                    </div>
                    <div className="panel-footer">
                        <button type="button" onClick={(e) => this.props.back()}>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    // return { ...props, error: state.sys.lastError };
    return { ...props };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //  push: path => dispatch(push(path)),
        // back: () => {
        //  dispatch(goBack());
        // }
        dispatch
    };
};

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ErrorSistemaPage);
