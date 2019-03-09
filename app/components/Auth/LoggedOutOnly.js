import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'components/Typography';

const LoggedOutOnly = props => {
  const { user, activityName, children } = props;

  if (user) {
    return (
      <Section name="You're logged in">
        <TextLink to="/account">Go to your account.</TextLink>
      </Section>
    );
  }

  return children;
};

LoggedOutOnly.propTypes = {
  user: PropTypes.object.isRequired,
  activityName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LoggedOutOnly.propTypes = {
  activityName: null,
};

export default LoggedOutOnly;
