import { Component } from 'react';
import * as React from 'react';
import { compose, Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signup, cleanError } from '../../actions/AuthActions';
import { TextField, Button } from 'react-md';
import { SignUpInfo } from '../../common/model/SignUpInfo';
import { CommonComponentProps } from '../../common/interface/CommonComponentProps';
import { AppStore } from '../../AppStore';
import { ThunkDispatch } from 'redux-thunk';

class Signup extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      nombre: '',
      apellido: ''
    };
  }

  componentWillUnmount() {
    this.props.dispatch(cleanError());
  }

  onSubmitRegister = () => {
    this.props.signup(this.state, () => {
      this.props.history.push('/feature');
    });
  };

  handleChange = (value, event) => {
    this.setState({ ...this.state, [event.target.name]: value });
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-page">
          <div className="form">
            <TextField
              name="username"
              id="username"
              label="Nombre Usuario"
              lineDirection="center"
              onChange={this.handleChange}
            />
            <TextField
              name="nombre"
              id="nombre"
              label="Nombre"
              lineDirection="center"
              onChange={this.handleChange}
            />
            <TextField
              name="apellido"
              id="apellido"
              label="Apellido"
              lineDirection="center"
              onChange={this.handleChange}
            />
            <TextField
              name="email"
              id="email"
              label="E-mail"
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
              onClick={() => this.onSubmitRegister()}
            >
              Register
            </Button>
            <div className="errorLogin">{this.props.errorMessage}</div>
            <p className="message">
              Ya está registrado?{' '}
              <a onClick={() => this.props.history.push('/login')}>Entrar al Sistema</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppStore): StateProps {
  return { errorMessage: state.auth.errorMessage };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStore, void, Action>): DispatchProps => {
  return {
    signup: (s: SignUpInfo, callback: Function) => dispatch(signup(s, callback)),
    dispatch
  };
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

interface SignUpState {
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
}

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  dispatch: Dispatch;
  signup: (s: SignUpInfo, callback: Function) => void;
}

type SignUpProps = StateProps & DispatchProps & CommonComponentProps;
