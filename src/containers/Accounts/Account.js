import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login,
  logout,
  logoutAll,
  requestMagicLink
} from 'redux/modules/auth';
import { LoginForm, Section, Button } from 'components';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    user: state.auth.user,
    loginError: state.auth.loginError,
    magicLinkRequested: state.auth.magicLinkRequested
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch =>
    bindActionCreators({ logout, logoutAll, login, requestMagicLink }, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    logoutAll: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    magicLinkRequested: PropTypes.object.magicLinkRequested,
    loginError: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    requestMagicLink: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      credentials: { email: '', password: '' }
    };
  }

  updateCredentials = newValue => {
    this.setState({ credentials: newValue });
  };

  handleSubmit = () => {
    this.props.login(this.state.credentials);
  };

  handleSubmitMagic = () => {
    this.props.requestMagicLink(this.state.credentials);
  };

  logoutAll = () => {
    this.props.logoutAll();
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { loginError, magicLinkRequested, user, ...rest } = this.props;

    return (
      <div className="container">
        <Helmet title="Log in" />
        {loginError && (
          <span style={{ color: 'red' }}>{loginError.reason}</span>
        )}
        {magicLinkRequested && (
          <span style={{ color: 'darkgreen' }}>
            A magic link has been sent to the email provided.
          </span>
        )}

        {!user && (
          <Section name="Log in">
            <LoginForm
              credentials={this.state.credentials}
              onDataChanged={this.updateCredentials}
              onSubmit={this.handleSubmit}
              onSubmitMagic={this.handleSubmitMagic}
            />
          </Section>
        )}
        {user && (
          <Section name="Log out">
            <Button
              className={getClassName('pages__component')}
              destructive
              onClick={this.logout}
            >
              Logout
            </Button>
            <br />
            <Button
              className={getClassName('pages__component')}
              destructive
              onClick={this.logoutAll}
            >
              Logout from all devices
            </Button>
          </Section>
        )}
      </div>
    );
  }
}
