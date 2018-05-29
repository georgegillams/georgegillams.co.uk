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
      loggedInSession: cookie.load('loggedInSession'),
      loginError: false,
      uname: '',
      pword: '',
      cookiesAccepted: cookie.load('cookiesAccepted'),
    };
  }

  componentDidMount() {
    const reloadLoggedInCookie = () => {
      this.setState({
        loggedInSession: cookie.load('loggedInSession'),
        cookiesAccepted: cookie.load('cookiesAccepted'),
      });
    };

    setInterval(reloadLoggedInCookie, 1000);
  }

  login = () => {
    DatabaseFunctions.login(this.state.uname, this.state.pword, result => {
      console.log(result);
      if (result.loggedInSessionId === null) {
        this.setState({ loginError: true });
      } else {
        this.setState({ loginError: false });
        cookie.save('loggedInSession', result.loggedInSessionId, { path: '/' });
      }
    });
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    if (!this.state.cookiesAccepted) {
      return (
        <Section name="Login">
          Please accept use of cookies to use account features on this website.
        </Section>
      );
    }

    return (
      <Section name="Login">
        {!this.state.loggedInSession ? (
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
