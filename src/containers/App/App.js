import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import {
  isLoaded as isNotificationsLoaded,
  load as loadNotifications
} from 'redux/modules/notifications';
import {
  NotificationCentre,
  NavigationBarNew,
  Footer,
  SessionManagement
} from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { cssModules } from 'bpk-react-utils';

import STYLES from './app.scss';

const getClassName = cssModules(STYLES);
// import {Logo} from '../../components/Typography';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isInfoLoaded(getState())) {
        promises.push(dispatch(loadInfo()));
      }
      if (!isNotificationsLoaded(getState())) {
        promises.push(dispatch(loadNotifications()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    newDataAvailable: PropTypes.bool.isRequired,
    user: state.auth.user
  }),
  dispatch => bindActionCreators({ pushState: push }, dispatch)
)
export default class App extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    loadAuth: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  // componentDidMount = () => {
  //   this.interval = setInterval(
  //     this.reloadAuthIfNecessary,
  //     CHECK_FOR_NEW_CONTENT_INTERVAL
  //   );
  // };

  //  componentWillUnmount() {
  //    clearInterval(this.interval);
  //  }

  // componentWillReceiveProps(nextProps) {
  //    if (!this.props.user && nextProps.user) {
  //      // login
  //      this.props.pushState("/loginSuccess");
  //    } else if (this.props.user && !nextProps.user) {
  //      // logout
  //      this.props.pushState("/logoutSuccess");
  //    }
  // }

  // reloadAuthIfNecessary = () => {
  //   if (this.props.newDataAvailable) {
  //     this.props.loadAuth();
  //   }
  // };

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user, children } = this.props;

    return (
      <div className={getClassName('app__outer')}>
        <Helmet {...config.app.head} />
        <SessionManagement />
        {/*        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: "#33e0ff" }}>
                <div className={styles.brand} />
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              {user && (
                <LinkContainer to="/chat">
                  <NavItem eventKey={1}>Chat</NavItem>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/register">
                  <NavItem eventKey={6}>Register</NavItem>
                </LinkContainer>
              )}
              {!user && (
                <LinkContainer to="/login">
                  <NavItem eventKey={7}>Login</NavItem>
                </LinkContainer>
              )}
              {user && (
                <LinkContainer to="/logout">
                  <NavItem
                    eventKey={7}
                    className="logout-link"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </NavItem>
                </LinkContainer>
              )}
            </Nav>
            {user && (
              <p className={styles.loggedInMessage + " navbar-text"}>
                Logged in as <strong>{user.name}</strong>.
              </p>
            )}
            <Nav navbar pullRight>
              <NavItem
                eventKey={1}
                target="_blank"
                title="View on Github"
                href="https://github.com/erikras/react-redux-universal-hot-example"
              >
                <i className="fa fa-github" />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />   */}
        <NavigationBarNew user={user} />
        <NotificationCentre />
        <div>{children}</div>
        <Footer />
      </div>
    );
  }
}
