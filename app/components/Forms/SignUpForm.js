import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from 'gg-components/FormBuilder';

import { USERNAME_REGEX, EMAIL_REGEX } from 'helpers/constants';

const SignUpForm = props => {
  const { onDataChanged, className, credentials, submitLabel, ...rest } = props;

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  const onDataChangedCustom = newValue => {
    if (newValue.email) {
      newValue.email = newValue.email.split(' ').join('');
    }
    onDataChanged(newValue);
  };

  return (
    <FormBuilder
      onDataChanged={onDataChangedCustom}
      entity={credentials}
      submitLabel={submitLabel || 'Sign up'}
      formFields={[
        {
          id: 'uname',
          name: 'Display name',
          validationRegex: USERNAME_REGEX,
          show: true,
          inputProps: {
            autofill: 'username',
          },
        },
        {
          id: 'email',
          name: 'Email',
          validationRegex: EMAIL_REGEX,
          show: true,
          inputProps: {
            spellcheck: 'false',
            autofill: 'email',
          },
        },
      ]}
      {...rest}
    />
  );
};

SignUpForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
