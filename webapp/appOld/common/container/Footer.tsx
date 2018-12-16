import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import {connect} from 'react-redux';
import {AppStore} from '../../AppStore';

export interface FooterProps {
    version: string
    children?: any
    develop?: boolean
}

const logoAfip = require('../../assets/img/logo_afip.png');
const logoPresidencia = require('../../assets/img/logo_presidencia.png');

const Footer = (props: FooterProps) => {
    return (
        <div>
            <div className='row'>
                <div className='col-md-2 col-sm-12'>
                    <img alt='AFIP' src={logoAfip} height='45'/>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <img alt='AFIP' src={logoPresidencia} height='45'/>
                </div>
                <div className='col-md-offset-2 col-md-5 col-sm-12'>
                    <ul>
                        <li>
                            <a href='ayuda.html'>Ayuda sobre App</a>
                        </li>
                        <li><a target='_blank' href='http://www.afip.gob.ar/'>Sitio web de Consultas</a></li>
                        <li className='small'>{props.version}</li>
                    </ul>
                </div>
            </div>

            {props.develop && <div> Estamos en develop </div>}
        </div>
    );
};

const mapStateToProps = (state: AppStore, props) => {
    return {
        ...props,
        develop: process.env.NODE_ENV === 'development',
        version: dotProp.get(state.sys, 'system.version', '')
    };
};

export default connect(mapStateToProps)(Footer);
