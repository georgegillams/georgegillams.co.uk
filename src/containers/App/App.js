import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import {
  createSession,
  keepAlive,
  updateNewDataAvailable,
  updateServerContentUpdateTimestamp,
  exposeSession,
} from 'redux/modules/sessions';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import {
  isLoaded as isNotificationsLoaded,
  load as loadNotifications,
} from 'redux/modules/notifications';
import {
  NotificationCentre,
  NavigationBar,
  Footer,
  SessionManagement,
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
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: PropTypes.bool.isRequired,
    notifications: state.notifications.data,
    user: state.auth.user,
    contentLastUpdatedTimestamp: state.sessions.contentLastUpdatedTimestamp,
    serverContentUpdateTimestamp: state.sessions.serverContentUpdateTimestamp,
    sessions: state.sessions.data,
  }),
  dispatch =>
    bindActionCreators(
      {
        pushState: push,
        loadNotifications,
        loadAuth,
        keepAlive,
        createSession,
        updateServerContentUpdateTimestamp,
        updateNewDataAvailable,
        exposeSession,
      },
      dispatch,
    ),
)
export default class App extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    loadNotifications: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    keepAlive: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    updateServerContentUpdateTimestamp: PropTypes.func.isRequired,
    updateNewDataAvailable: PropTypes.func.isRequired,
    exposeSession: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
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

  componentDidMount = () => {
    this.interval = setInterval(this.reloadNotificationsIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadNotificationsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadNotifications();
    }
  };

  render() {
    const {
      user,
      children,
      notifications,
      keepAlive,
      createSession,
      updateServerContentUpdateTimestamp,
      updateNewDataAvailable,
      exposeSession,
    } = this.props;

    return (
      <div className={getClassName('app__outer')}>
        <Helmet {...config.app.head} />
        <SessionManagement
          keepAlive={keepAlive}
          createSession={createSession}
          updateServerContentUpdateTimestamp={
            updateServerContentUpdateTimestamp
          }
          updateNewDataAvailable={updateNewDataAvailable}
          exposeSession={exposeSession}
        />
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
        <div className={getClassName('app__content')}>
          <NavigationBar user={user} />
          <NotificationCentre notifications={notifications} />
          <div>{children}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
