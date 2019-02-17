import { Component } from 'react';
import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppStore } from '../../AppStore';
import { CommonComponentProps } from '../../common/interface/CommonComponentProps';
import { TextField, Button } from 'react-md';
import { login, cleanError } from '../../actions/AuthActions';

class Login extends Component<LoginProps, IState> {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  componentWillUnmount() {
    this.props.dispatch(cleanError());
  }

  onSubmit = () => {
    this.props.login(this.state, () => {
      this.props.history.push('/');
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
           {/*  <p className="message">
              No está registrado?{' '}
              <a onClick={() => this.props.history.push('/signup')}>Registrarse</a>
            </p> */}
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
    login: (s: { username: string; password: string }, callback: Function) =>
      dispatch(login(s, callback)),
    dispatch
  };
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Login);

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  dispatch: Dispatch;
  login: (s: { username: string; password: string }, callback: Function) => void;
}

interface IState {
  username: string;
  password: string;
}

type LoginProps = StateProps & DispatchProps & CommonComponentProps;
