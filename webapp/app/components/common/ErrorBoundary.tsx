import {Component} from 'react';
import * as React from 'react';
import ErrorSistemaPage from './ErrorSistemaPage';

class ErrorBoundary extends  React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: '',
            info: ''
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info
        });
        if (error) {
            // todo llamar a server y mandar error ahi
            // log.error('Error de UI', error);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorSistemaPage error={JSON.stringify(this.state.info)}>
                    {JSON.stringify(this.state.info)}
                    {this.props.children}
                </ErrorSistemaPage>
            );
        }
        return this.props.children;
    }
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: string;
    info: string;
}

export default ErrorBoundary;
