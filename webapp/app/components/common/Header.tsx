import { Component } from 'react';
import * as React from 'react';
import * as dotProp from 'dot-prop-immutable';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUserFromToken } from '../../actions/AuthActions';
import { User } from '../../common/model/User';
import { AppStore } from '../../AppStore';
import SideDrawer from './SideDrawer';
import { CHANGE_MENU } from '../../actions/types';
import { Toolbar, Button } from 'react-md';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface HeaderState {
  showSideBar: boolean;
}

class Header extends Component<StateProps & DispatchProps, HeaderState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = { showSideBar: false };
  }

  componentDidMount() {
    // this.props.loadUserFromToken();
  }

  displayUser = (user: User) => {
    if (!user) {
      return '';
    }
    return user.nombre + ' ' + user.apellido;
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  }

  onLogout() {
    this.props.dispatch(push('/signout'));
  }

  changeSideBarStatus = () => {
    this.props.dispatch({ type: CHANGE_MENU });
  };

  render() {
    const sideNavbarClassName = this.state.showSideBar ? '' : 'hide-menu';

    const logoutComponent = (
      <span>
        <div className="header-user">
          <i className="fa fa-user" />
          {/*   <DropdownButton
            title={
              <span className="dropdown-user-button">
                {this.displayUser(this.props.user)}
              </span>
            }
            key={2}
            id={'dropdown-user'}
          >
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4" onSelect={() => this.onLogout()}>
              Salir
            </MenuItem>
          </DropdownButton> */}
        </div>
      </span>
    );

    const loginComponent = (
      <span>
        <div className="header-user">
          <span className="button-app-bar">
            {/*    <Button onClick={() => this.props.dispatch(push('/login'))}>
              Login
            </Button>
            <Button onClick={() => this.props.dispatch(push('/signup'))}>
              Registrarse
            </Button> */}
          </span>
        </div>
      </span>
    );

    const rightButtons = (
      <div>
        <div className="">
          <div className="">{this.props.authenticated ? logoutComponent : loginComponent}</div>
        </div>
      </div>
    );
    const logoApp = require('../../assets/img/logo_app.png');

    return (
      <div className="toolbar-div">
        <Toolbar
          className="toolbar-custom"
          nav={
            <Button onClick={() => this.changeSideBarStatus()} icon>
              menu
            </Button>
          }
          title="FarmaSalud"
        />
        <SideDrawer />
      </div>
    );
  }
}

interface StateProps {
  authenticated: boolean;
  user: User;
}

function mapStateToProps(state: AppStore): StateProps {
  return {
    authenticated: state.auth.authenticated,
    user: dotProp.get(state.auth, 'user', undefined)
  };
}

interface DispatchProps {
  loadUserFromToken: () => void;
  dispatch: Dispatch;
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppStore, void, Action>): DispatchProps {
  return {
    loadUserFromToken: () => {
      dispatch(loadUserFromToken());
    },
    dispatch
  };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
