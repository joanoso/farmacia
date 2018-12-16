import { Component } from 'react';
import axios, {AxiosResponse} from 'axios';
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStore } from '../../AppStore';
import { CommonComponentProps } from '../../common/interface/CommonComponentProps';
import { TextField, Button } from 'react-md';
import { login, cleanError } from '../../actions/AuthActions';
import {Student} from "../../../appOld/common/model/Student";

class Login extends Component<LoginProps, LoginState> {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', students: [] };
    }

    componentWillUnmount() {
        this.props.dispatch(cleanError());
    }

    onSubmit = () => {
        this.props.login(this.state, () => {
            this.props.history.push('/feature');
        });
    };

    handleChange = (value, event) => {
        this.setState({ ...this.state, [event.target.name]: value });
    };

    onClickTraer = () => {

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

    render() {
        return (
            <div className="login-wrapper">
                {/*<button onClick={() => this.onClickTraer()}>Traer studentsa</button>*/}
                {/*{this.renderStudents()}*/}
                <div className="login-page">
                    <div className="form">
                        <TextField
                            name="username"
                            id="username"
                            label="Username"
                            lineDirection="center"
                            onChange={this.handleChange}
                        />
                        <TextField
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            lineDirection="center"
                            onChange={this.handleChange}
                        />
                        <br />
                        <Button
                            flat
                            primary
                            swapTheming
                            className="login-button"
                            onClick={() => this.onSubmit()}
                        >
                            login
                        </Button>
                        <div className="errorLogin">{this.props.errorMessage}</div>
                        <p className="message">
                            No está registrado?{' '}
                            <a onClick={() => this.props.history.push('/signup')}>
                                Registrarse
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppStore) {
    return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (s: { username: string; password: string }, callback: Function) =>
            dispatch(login(s, callback)),
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

interface PropsFromState {
    errorMessage: string;
}

interface PropsFromDispatch {
    dispatch: Function;
    login: Function;
}

interface LoginState {
    username: string;
    password: string;
    students : any[]
}

type LoginProps = PropsFromState &
    PropsFromDispatch &
    CommonComponentProps;
