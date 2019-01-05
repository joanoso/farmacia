import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { CommonComponentProps } from '../../common/interface/CommonComponentProps';
import { AppStore } from '../../AppStore';

export default (ChildComponent) => {
  class ComposedComponent extends Component<requireAuthProps, {}> {
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

  function mapStateToProps(state: AppStore): StateProps {
    return { auth: state.auth.authenticated };
  }

  return connect<StateProps, {}, {}>(mapStateToProps)(ComposedComponent);
};

interface StateProps {
  auth: boolean;
}

type requireAuthProps = StateProps & CommonComponentProps;
