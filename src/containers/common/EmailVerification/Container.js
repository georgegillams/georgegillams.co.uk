import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import { Paragraph } from 'gg-components/Paragraph';

import { withRouter } from 'next/router';

const EmailVerification = props => {
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const {
    router,
    verify,

    verificationState,
    authenticatorState,

    className,
  } = props;

  const { verifyError, verifyResult } = verificationState;

  useEffect(() => {
    let token = null;
    if (router && router.query) {
      token = router.query.token;
    }
    if (!verificationAttempted && token) {
      verify(token);
      setVerificationAttempted(true);
    }
  }, [verificationState, router]);

  const success = verifyResult && !verifyError;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <PageTitle name={success ? 'Email confirmed' : 'Confirming email'}>
        {success && (
          <>
            <Paragraph>Thank you for confirming your email address</Paragraph>
          </>
        )}
        {verifyError && (
          <>
            <Paragraph>Something went wrong whilst confirming your email</Paragraph>
            {verifyError.errorMessage && (
              <>
                <br />
                <Paragraph>{verifyError.errorMessage}</Paragraph>
              </>
            )}
          </>
        )}
      </PageTitle>
      <DebugObject
        debugTitle="EmailVerification"
        debugObject={{
          verify,
          authenticatorState,
          verificationState,
        }}
      />
    </div>
  );
};

EmailVerification.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
    query: PropTypes.shape({
      token: PropTypes.string,
      redirect: PropTypes.string,
    }).isRequired,
  }),
  verify: PropTypes.func.isRequired,
  verificationState: PropTypes.shape({
    token: PropTypes.string,
    verifying: PropTypes.bool,
    verifyError: PropTypes.object,
    verifyResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
};

EmailVerification.defaultProps = {
  router: null,
  verificationState: null,
  magicLoginState: null,
  className: null,
};

export default withRouter(EmailVerification);
