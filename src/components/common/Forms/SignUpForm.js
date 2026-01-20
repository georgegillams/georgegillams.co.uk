import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';
import CloudflareTurnstile from 'components/common/CloudflareTurnstile';

import { USERNAME_REGEX, EMAIL_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const SignUpForm = props => {
  const { onDataChanged, credentials, submitLabel, turnstileSiteKey, ...rest } = props;
  const [turnstileToken, setTurnstileToken] = useState(null);

  const onDataChangedCustom = newValue => {
    if (!newValue || !newValue.email) {
      onDataChanged({ ...newValue, turnstileToken });
      return;
    }
    const newEmail = newValue.email.split(' ').join('');
    onDataChanged({ ...newValue, email: newEmail, turnstileToken });
  };

  const onTurnstileVerify = token => {
    setTurnstileToken(token);
    onDataChanged({ ...credentials, turnstileToken: token });
  };

  const onTurnstileError = () => {
    setTurnstileToken(null);
    onDataChanged({ ...credentials, turnstileToken: null });
  };

  const onTurnstileExpire = () => {
    setTurnstileToken(null);
    onDataChanged({ ...credentials, turnstileToken: null });
  };

  return (
    <>
      <FormBuilder
        onDataChanged={onDataChangedCustom}
        entity={credentials}
        submitLabel={submitLabel || 'Sign up'}
        disabled={!credentials.consent || !turnstileToken}
        formFields={[
          {
            id: 'uname',
            name: 'Display name',
            validationRegex: USERNAME_REGEX,

            inputProps: {
              autofill: 'username',
            },
          },
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,

            inputProps: {
              spellCheck: 'false',
              autofill: 'email',
            },
          },
          {
            type: 'CHECKBOX',
            id: 'consent',
            name: 'I consent to the data entered above being stored.',
          },
        ]}
        test={process.env.NODE_ENV === 'test'}
        {...rest}
      />
      {turnstileSiteKey && process.env.NODE_ENV !== 'test' && (
        <div style={{ marginTop: '16px' }}>
          <CloudflareTurnstile
            siteKey={turnstileSiteKey}
            onVerify={onTurnstileVerify}
            onError={onTurnstileError}
            onExpire={onTurnstileExpire}
          />
        </div>
      )}
    </>
  );
};

SignUpForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  turnstileSiteKey: PropTypes.string,
};

SignUpForm.defaultProps = {
  submitLabel: null,
  turnstileSiteKey: null,
};

export default SignUpForm;
