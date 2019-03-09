import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection, TextLink } from 'components/Typography';
import { DebugObject } from 'components/Auth';
import cookie from 'react-cookies';

import 'containers/pages.scss';

const getClassName = c => c;

export default class Authenticator extends React.Component {
  componentDidMount = () => {
    this.props.setCookiesAllowed();
    const sessionCookie = cookie.load('session');
    if (sessionCookie) {
      // this.props.setCookiesAllowed();
      this.props.reauthenticate();
    }
  };

  render() {
    const {
      reauthenticate,
      reauthenticating,
      reauthenticatingSuccess,
      reauthenticatingError,
      sessionKeyChanged,
      cookiesAllowed,
      setCookiesAllowed,
      user,
      userLoading,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <DebugObject
          debugTitle="Authenticator"
          debugObject={{
            user,
            userLoading,
            cookiesAllowed,
            reauthenticating,
            reauthenticatingError,
            reauthenticatingSuccess,
          }}
        />
      </div>
    );
  }
}

Authenticator.propTypes = {
  cookiesAllowed: PropTypes.bool,
  reauthenticating: PropTypes.bool,
  reauthenticatingError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
