import React from 'react';
import PropTypes from 'prop-types';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';

const LoggedOutOnly = props => {
  const { user, children, ...rest } = props;

  if (user) {
    return (
      <Section name="You're logged in" {...rest}>
        <TextLink href="/account">Go to your account.</TextLink>
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
