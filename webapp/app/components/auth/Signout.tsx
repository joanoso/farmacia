import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/AuthActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppStore } from '../../AppStore';
import { Action } from 'redux';

interface DispatchProps {
  signout: () => void;
}

class Signout extends Component<DispatchProps, {}> {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStore, void, Action>): DispatchProps => {
  return {
    signout: () => dispatch(signout)
  };
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps
)(Signout);
