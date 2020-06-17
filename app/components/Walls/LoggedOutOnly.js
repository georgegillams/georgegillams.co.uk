import React from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'gg-components/Typography';

const LoggedOutOnly = props => {
  const { user, children, ...rest } = props;

  if (user) {
    return (
      <Section name="You're logged in" {...rest}>
        <TextLink to="/account">Go to your account.</TextLink>
      </Section>
    );
  }

  return children;
};

LoggedOutOnly.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

LoggedOutOnly.defaultProps = {
  user: null,
};

export default LoggedOutOnly;
