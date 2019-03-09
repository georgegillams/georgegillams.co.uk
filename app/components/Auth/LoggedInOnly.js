import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'components/Typography';
import { redirectToCurrentPageAfterLogin } from 'helpers/storageHelpers';

const LoggedInOnly = props => {
  const { user, activityName, children } = props;

  if (!user) {
    return (
      <Section name="Logged out">
        <span>
          You need to be logged in to {activityName || 'view this content'}
        </span>
        <br />
        <TextLink to="/sign-up">
          Register here - it&apos;s quick and easy.
        </TextLink>
        <br />
        <TextLink onClick={redirectToCurrentPageAfterLogin} to="/login">
          Already got an account? Log in here.
        </TextLink>
      </Section>
    );
  }

  return children;
};

LoggedInOnly.propTypes = {
  user: PropTypes.object.isRequired,
  activityName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoggedInOnly;
