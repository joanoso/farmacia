import * as  React from 'react';
import axios, {AxiosResponse} from 'axios';
import {push} from 'react-router-redux';
import {connect, DispatchProp} from 'react-redux';
import {browserHistory} from 'react-router';
import {AppStore} from '../AppStore';
import PanelMedia from '../common/component/PanelMedia';
import Page from '../common/container/Page';
import {Student} from '../common/model/Student';
import {login} from '../reducer/Auth';
import {Credentials} from '../common/model/auth/Credentials';

class InitPage extends React.Component<InitPageProps, InitPageState> {

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    auth() {
        const credentials = {username: 'admin', password: '123'} as Credentials;
        this.props.login(credentials);
    }

    fillStudents() {

        axios.get('/api/students').then(
            (resp: AxiosResponse<Student[]>) => {
                this.setState({...this.state, students: resp.data});
            }
        ).catch((err) => {
            console.log(err.response.data.error);
        });
    }

    renderStudents() {
        return this.state.students.map(
            (student: Student) => {
                return (
                    <div key={student.id}>
                        {student.id}
                    </div>
                );
            }
        );
    }

    renderBtnInitPage() {
        return (<div>
            <button type='button' aria-label={'Iniciar'} className={'btn btn-sm btn-primary'}>
                Iniciar
            </button>
            <button type='button' aria-label={'Informes'} className={'btn btn-sm btn-link'}
                    onClick={() => this.fillStudents()}>
                Informes
            </button>
            <button type='button' aria-label={'Informes'} className={'btn btn-sm btn-link'}
                    onClick={() => this.auth()}>
                Auth
            </button>
        </div>);
    }

    render() {
        return (
            <Page>
                <div className='col-md-9'>
                    <h1>Titulo</h1>
                    <p className='text-muted text-justify'>
                        Descripción
                    </p>
                    <PanelMedia
                        title={'Tus Declaraciones'}
                        text={'Aca podes realizar acciones sobre tus declaraciones'}
                        buttons={this.renderBtnInitPage()}
                        iconStyle={'fa-file-text-o'}>

                        <div>
                            Hola como va...??
                        </div>

                        {this.renderStudents()}

                    </PanelMedia>
                </div>
            </Page>
        );
    }
}

interface InitPageProps {
    login: (cred: Credentials) => void;
}

interface InitPageState {
    students: Student[];
}

const mapStateToProps = (state: AppStore, props: any) => {
    return {
        ...props,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials: Credentials) => {
            dispatch(login(credentials));
        },
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitPage);
