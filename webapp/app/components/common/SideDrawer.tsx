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
import { ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';

class SideDrawer extends Component<StateProps & DispatchProps, {}> {
  constructor(props: StateProps & DispatchProps) {
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

  /*  it = [
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
      onClick={() => this.onMenuPress('/signout')}
      flat
      iconChildren="chat_bubble_outline"
      key="home4"
      className="drawer-button"
    >
      Salir
    </Button>
  ]; */

  renderItems(items: any[]) {
    return items.map((it, index) => {
      switch (it.type) {
        case 'divider':
        return { divider: true };

        case 'subheader':
        return { subheader: true, primaryText: 'HEADER' };

        default:
        if (!it.show && it.show !== undefined) {
          return <span key={index} />;
        }
        return (
          <Button
            onClick={() => this.onMenuPress(it.path)}
            flat
            iconChildren={it.icon}
            key={index}
            className={it.className}
          >
            {it.label}
          </Button>
        );
      }
    });
  }

  render() {
    const { authenticated } = this.props;
    const drawerClassname = 'drawer-custom' + (this.props.menuOpen ? '-open' : '');

    const items = [
      { label: 'Crear Remito', icon: 'home', className: 'drawer-button', path: '/crearRemito' },
      { type: 'divider' },
      {
        label: 'Consultar Remitos',
        icon: 'chat_bubble_outline',
        className: 'drawer-button',
        path: '/consultarRemitos'
      },
      {
        label: 'Crear Sucursal',
        icon: 'chat_bubble_outline',
        className: 'drawer-button',
        path: '/crearSucursal'
      },
      {
        label: 'Buscar Sucursal',
        icon: 'chat_bubble_outline',
        className: 'drawer-button',
        path: '/buscarSucursal'
      },
      {
        label: 'Login',
        icon: 'chat_bubble_outline',
        className: 'drawer-button',
        path: '/login',
        show: !authenticated
      },
      {
        label: 'Salir',
        icon: 'chat_bubble_outline',
        className: 'drawer-button',
        path: '/signout',
        show: authenticated
      }
    ];

    return (
      <div>
        <Drawer
          className={drawerClassname}
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.props.menuOpen}
          overlay={true}
          position={'left'}
          onVisibilityChange={this.handleVisibility}
          navItems={this.renderItems(items)}
          header={
            <div className="header-toolbar">
              <div className="user-info" />
              {this.props.user && (
                <div className="footer">
                  <p className="name">
                    {this.props.user.firstName + ' ' + this.props.user.lastName}
                  </p>
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

interface DispatchProps {
  changeMenu: () => void;
  dispatch: Dispatch;
}

interface StateProps {
  menuOpen: boolean;
  user: User;
  authenticated: boolean;
}

function mapStateToProps(state: AppStore): StateProps {
  return {
    menuOpen: state.sys.menuOpen,
    user: state.auth.user,
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppStore, void, Action>): DispatchProps {
  return {
    changeMenu: () => dispatch(changeMenu),
    dispatch
  };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
