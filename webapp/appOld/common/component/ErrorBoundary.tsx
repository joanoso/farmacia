import * as React from 'react';
import PanelDanger from '../component/PanelDanger';
import ErrorSistemaPage from '../container/ErrorSistemaPage';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    info?: any
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info
        });
        if (error) {
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

export default ErrorBoundary;