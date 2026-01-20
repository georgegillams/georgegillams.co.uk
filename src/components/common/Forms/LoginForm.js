import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormBuilder, { FORM_FIELD_VISIBILITY } from '@george-gillams/components/form-builder';
import CloudflareTurnstile from 'components/common/CloudflareTurnstile';

import { EMAIL_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const LoginForm = props => {
  const { credentials, onDataChanged, turnstileSiteKey, ...rest } = props;
  const [turnstileToken, setTurnstileToken] = useState(null);

  const onDataChangedCustom = newValue => {
    if (!newValue.email) {
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
        submitLabel={credentials.useMagicLink ? 'Request magic link' : 'Login'}
        disabled={!turnstileToken}
        // eslint-disable-next-line max-len
        preSubmitText="An email containing a login link will be sent to you. To access your account, follow the link in the email."
        formFields={[
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,
            inputProps: {
              type: 'email',
              spellCheck: 'false',
              autofill: 'username',
              autocomplete: 'username',
            },
          },
          {
            id: 'password',
            name: 'Password',
            visibility: FORM_FIELD_VISIBILITY.VISUALLY_HIDDEN,
            inputProps: {
              type: 'password',
              spellCheck: 'false',
              autofill: 'current-password',
              autocomplete: 'current-password',
            },
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

LoginForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  turnstileSiteKey: PropTypes.string,
};

LoginForm.defaultProps = {
  turnstileSiteKey: null,
};

export default LoginForm;
