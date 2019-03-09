import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import GGButton from 'components/GGButton';
import { TextLink } from 'components/Typography';

import { PROJECT_NAME, UNAME_REGEX, EMAIL_REGEX } from 'helpers/constants';
import FormBuilder from './FormBuilder';

import './forms.scss';

class Login extends React.Component {
  static propTypes = {
    credentials: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, credentials, submitLabel, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={credentials}
        submitLabel={submitLabel || 'Sign up'}
        formFields={[
          {
            id: 'uname',
            name: 'Display name',
            validationRegex: UNAME_REGEX,
            show: PROJECT_NAME !== 'EPICC',
          },
          {
            id: 'email',
            name: 'Email',
            validationRegex: EMAIL_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default Login;
