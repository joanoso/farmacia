import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { CommonComponentProps } from '../../common/interface/CommonComponentProps';

export default (ChildComponent) => {
  class ComposedComponent extends Component<requireAuthProps, any> {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

interface PropsFromState {
  auth: boolean
}

type requireAuthProps = PropsFromState & CommonComponentProps;