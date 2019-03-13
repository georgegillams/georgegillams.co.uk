import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'components/Typography';

const AdminOnly = props => {
  const { user, children, setLoginRedirect } = props;

  if (!user || !user.admin) {
    return (
      <Section name="Admin only">
        <span>
          You need to be logged in with an admin account to view this content.
        </span>
        <br />
        <TextLink onClick={setLoginRedirect} to="/login">
          Got a different admin account? Log in here.
        </TextLink>
      </Section>
    );
  }

  return children;
};

AdminOnly.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminOnly;
