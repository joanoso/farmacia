import * as  React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import {Button, Badge} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {AppStore} from '../../AppStore';

import ErrorBoundary from '../component/ErrorBoundary';
import Footer from './Footer';
import Header from './Header';

export interface PageProps {
    push: Function;
    title: string
    children?: any
}

class Page extends React.Component<PageProps, any> {

    render() {
        const {children} = this.props;
        return (
            <ErrorBoundary>
                <ReduxBlockUi tag='div' message={'Procesando'}
                              block={'START_FETCHING'}
                              unblock={['END_FETCHING']}>

                    <Header/>

                    <div className='container'>
                        {children}
                    </div>
                    <div className='container p-y-2'>
                        <Footer versionNamePrefix='GPH'> </Footer>
                    </div>
                </ReduxBlockUi>
            </ErrorBoundary>
        );

    }
}

const mapStateToProps = (state: AppStore, props: PageProps): PageProps => ({
    ...props,
    title: 'Secuencia | Estado'
});

const mapDispatchToProps = (dispatch) => {
    return {
        push: (path) => {
            dispatch(push(path));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
