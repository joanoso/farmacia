import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/AuthActions';

interface SignoutProps {
    signout(): void;
}

class Signout extends Component<SignoutProps, {}> {
    componentDidMount() {
        this.props.signout();
    }

    render() {
        return <div>Sorry to see you go</div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => dispatch(signout),
        dispatch
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Signout);
