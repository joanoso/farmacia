import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Component} from 'react';
import {AppStore} from '../../AppStore';
import {Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {logoutFn} from '../../reducer/Auth';

class Header extends Component<HeaderProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            user: '',
            pass: ''

        };
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleChangeUser = (e) => {
        this.setState({user: e.target.value});
    }

    handleChangePass = (e) => {
        this.setState({pass: e.target.value});
    }

    handleSubmit = (e) => {
        // Llamar a server
        this.handleClose();
    }

    render() {

        const {isAuthenticated} = this.props;

        const logoutComponent = <a className='m-t-0' onClick={(e) => this.props.onLogout()}>
            <i className='fa fa-sign-out'/> </a>;

        const loginComponent = <a className='m-t-0' onClick={(e) => this.handleShow()}>
            <span>
                <i className='fa fa-sign-in'></i>
            </span></a>;

        const personaInfo = (p: any) => {
            return (
                <span>
                    <small className='nombre-propio text-right'>
                        {p.descripcionCorta}  &nbsp;
                    </small>
                </span>
            );
        };

        const userInfo = (
            <div>
                {/*usuario logueado con representado seleccionado*/}
                <div className='media'>
                    <div className='media-body media-middle'>
                        {personaInfo({id: 2, descripcion: 'Pepe'})}
                    </div>
                    <div className='media-center'>{isAuthenticated ? logoutComponent : loginComponent}
                    </div>
                </div>
            </div>
        );

        const logoAfip = require('../../assets/img/logo_afip.png');

        return (
            <header>
                <nav className='navbar navbar-top navbar-default' role='navigation'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-7'>
                                <div className='row'>
                                    <a href='http://www.afip.gob.ar' className='navbar-brand'>
                                        <div className='pull-left'>
                                            <img alt='AFIP'
                                                 src={logoAfip}
                                                 height='45'/>
                                        </div>
                                    </a>
                                    <div className='pull-left text-left headerNombreSistema m-t-1'>
                                        Estudiantes
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-5 text-right'>
                                {userInfo}
                            </div>
                        </div>
                    </div>
                </nav>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ingresar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId='formBasicText'>
                                <ControlLabel>Working example with validation</ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.value}
                                    placeholder='Enter User'
                                    onChange={this.handleChangeUser}
                                />

                                <FormControl
                                    type='password'
                                    value={this.state.value}
                                    placeholder='Enter Pass'
                                    onChange={this.handleChangePass}
                                />
                                <button type='submit'>Submit</button>
                                <FormControl.Feedback/>
                            </FormGroup>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.handleClose}>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </header>
        );
    }
}

export interface HeaderProps {
    isAuthenticated: boolean
    onLogout?: () => void

}

const mapStateToProps = (state: AppStore, props: HeaderProps) => {
    return {
        isAuthenticated: state.auth.authenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logoutFn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);