import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'gg-components/helpers/cssModules';

import { PageTitle } from 'gg-components/Typography';
import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import { Button } from 'gg-components/Button';
import { CodeInline } from 'gg-components/Code';
import { LoginForm } from 'components/Forms';
import { DebugObject } from 'gg-components/Auth';
import { CookiesOnly } from 'components/Sessions';
import { GGRedirect } from 'gg-components/Redirect';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class EmailVerification extends React.Component {
  componentDidMount = () => {
    const interval = setInterval(() => {
      const tokenValue = new URL(window.location).searchParams.get('token');
      if (this.props.cookiesAllowed) {
        this.props.verifyEmail(tokenValue);
        clearInterval(interval);
      }
    }, 200);
  };

  render() {
    const {
      cookiesAllowed,
      onCookiesAccepted,
      user,
      verifyEmail,
      verifying,
      verifySuccess,
      verifyError,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (verifySuccess) {
      return (
        <GGRedirect
          className={outerClassNameFinal.join(' ')}
          to="/account"
          name="Thanks for verifying your email"
        />
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="Email verification" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={() => {
            onCookiesAccepted();
          }}
        />
        <PageTitle name="Email verification">
          {verifySuccess && <span>Thanks for verifying your email!</span>}
        </PageTitle>
        <DebugObject
          debugTitle="Email verification"
          debugObject={{
            cookiesAllowed,
            onCookiesAccepted,
            verifyEmail,
            user,
            verifying,
            verifySuccess,
            verifyError,
          }}
        />
      </div>
    );
  }
}

EmailVerification.propTypes = {
  verifying: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  verifyEmail: PropTypes.func.isRequired,
  className: PropTypes.string,
};
