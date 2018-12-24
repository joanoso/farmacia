import * as React from 'react';
import { Component } from 'react';
import { CHANGE_MENU } from '../../actions/types';
import { AppStore } from '../../AppStore';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { User } from '../../common/model/User';

import { Button, Drawer, Toolbar } from 'react-md';
import { changeMenu } from '../../actions/SysActions';
import { setCurrentObject } from '../../reducers/form';

class SideDrawer extends Component<IStoreStateProps & IDispatchProps, {}> {
  constructor(props) {
    super(props);
  }

  handleVisibility = () => {
    this.props.dispatch(changeMenu());
  };

  onMenuPress = (path: string) => {
    this.props.dispatch(setCurrentObject(undefined));
    this.props.dispatch(push(path));
    this.handleVisibility();
  };

  it = [
    <Button
      flat
      iconChildren="home"
      key="crearRemito"
      onClick={() => this.onMenuPress('/crearRemito')}
      className="drawer-button"
    >
      Crear Remito
    </Button>,
    { divider: true },
    <Button
      flat
      iconChildren="chat_bubble_outline"
      key="home2"
      className="drawer-button"
      onClick={() => this.onMenuPress('/login')}
    >
      Login
    </Button>,
    <Button
      flat
      iconChildren="chat_bubble_outline"
      key="home3"
      className="drawer-button"
      onClick={() => this.onMenuPress('/consultarRemitos')}
    >
      Consultar Remitos
    </Button>,
    <Button
      onClick={() => this.onLogout()}
      flat
      iconChildren="chat_bubble_outline"
      key="home4"
      className="drawer-button"
    >
      Salir
    </Button>
  ];

  onLogout() {
    this.props.dispatch(push('/signout'));
  }

  render() {
    const drawerClassname = 'drawer-custom' + (this.props.menuOpen ? '-open' : '');

    return (
      <div>
        <Drawer
          className={drawerClassname}
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.props.menuOpen}
          overlay={true}
          position={'left'}
          onVisibilityChange={this.handleVisibility}
          navItems={this.it}
          header={
            <div className="header-toolbar">
              <div className="user-info" />
              {this.props.user && (
                <div className="footer">
                  <p className="name">{this.props.user.nombre + ' ' + this.props.user.apellido}</p>
                  <p className="mail">{this.props.user.email}</p>
                </div>
              )}
            </div>
          }
        />
      </div>
    );
  }
}

interface IDispatchProps {
  changeMenu: () => void;
  dispatch: Function;
}

interface IStoreStateProps {
  menuOpen: boolean;
  user: User;
}

function mapStateToProps(state: AppStore): IStoreStateProps {
  return {
    menuOpen: state.sys.menuOpen,
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch): IDispatchProps {
  return {
    changeMenu: () => dispatch(changeMenu),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
