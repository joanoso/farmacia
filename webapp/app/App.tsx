import * as React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import Header from './components/common/Header';
import ErrorBoundary from './components/common/ErrorBoundary';
import 'react-block-ui/style.css';

export default ({children}) => {
    return (
        <ErrorBoundary>
            <ReduxBlockUi
                className="outer"
                tag="div"
                message={'Procesando'}
                block={'START_FETCHING'}
                unblock={['END_FETCHING']}>
                <Header/>
                <div className="main-container">
                    {children}
                </div>
            </ReduxBlockUi>
        </ErrorBoundary>
    );
};
