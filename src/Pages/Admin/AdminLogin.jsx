import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import cookie from 'react-cookies';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import Section from '../../components/Section';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,
      uname: '',
      pword: '',
    };
  }

  login = () => {
    DatabaseFunctions.login(this.state.uname, this.state.pword, result => {
      if (result.loggedInSessionId === null) {
        this.setState({ loginError: true });
      } else {
        this.setState({ loginError: false });
        cookie.save('loggedInSession', result.loggedInSessionId, { path: '/' });
      }
    });
  };

  render() {
    const { className, loggedInSession, cookiesAccepted, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    if (!cookiesAccepted) {
      return (
        <Section name="Login">
          Please accept use of cookies to use account features on this website.
        </Section>
      );
    }

    return (
      <Section name="Login">
        {!loggedInSession ? (
          <div>
            <BpkBannerAlert
              className={getClassName('pages__card')}
              message="Error logging in."
              show={this.state.loginError}
              type={ALERT_TYPES.ERROR}
            />
            <BpkInput
              className={getClassName('pages__card')}
              id="uname"
              name="Username"
              value={this.state.uname}
              onChange={event => this.setState({ uname: event.target.value })}
              placeholder="Username"
            />
            <BpkInput
              className={getClassName('pages__card')}
              type={INPUT_TYPES.PASSWORD}
              id="pword"
              name="Password"
              value={this.state.pword}
              onChange={event => this.setState({ pword: event.target.value })}
              placeholder="Password"
            />
            <Button
              disabled={this.state.uname === '' && this.state.pword === ''}
              onClick={this.login}
            >
              Login
            </Button>
          </div>
        ) : (
          <Button
            destructive
            onClick={() => {
              cookie.remove('loggedInSession', { path: '/' });
            }}
          >
            Logout
          </Button>
        )}
      </Section>
    );
  }
}

export default AdminLogin;
