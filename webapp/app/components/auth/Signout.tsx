import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/AuthActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppStore } from '../../AppStore';
import { Action, Dispatch } from 'redux';
import { push } from 'connected-react-router';

interface DispatchProps {
  signout: () => void;
  dispatch: Dispatch;
}

class Signout extends Component<DispatchProps, {}> {
  componentDidMount() {
    this.props.signout();
    this.props.dispatch(push('/login'));
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStore, void, Action>): DispatchProps => {
  return {
    signout: () => dispatch(signout()),
    dispatch
  };
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps
)(Signout);
