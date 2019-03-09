import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'components/Typography';

const EmailVerifiedOnly = props => {
  const { user, children } = props;

  if (!user || !user.emailVerified) {
    return (
      <Section name="You need to verify your email before completing this step.">
        <TextLink to="/account">Account</TextLink>
      </Section>
    );
  }

  return children;
};

EmailVerifiedOnly.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default EmailVerifiedOnly;
