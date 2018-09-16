import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from '../';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { welcomeMessage, user } = this.props;
    const { name, uname, email, emailFingerprint, emailVerified } = user;

    return (
      <Section name={`${welcomeMessage || 'User'} ${uname}`}>
        {`Name ${name}`}
        <br />
        {`Username ${uname}`}
        <br />
        {`Email ${email}`}
        <br />
        {`Email fingerprint ${emailFingerprint}`}
        <br />
        {`Email verified ${emailVerified}`}
        <br />
        <br />
      </Section>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  welcomMessage: PropTypes.String,
};

User.defaultProps = {
  welcomMessage: null,
};

export default User;
