import React from 'react';
import PropTypes from 'prop-types';
import { Section, TextLink } from 'components/Typography';

const Redirect = props => {
  const { name, to, ...rest } = props;

  window.location = to;
  return (
    <div {...rest}>
      <Section name={props.name || 'Redirecting...'}>
        <TextLink to={props.to}>Not been redirected? Click here.</TextLink>
      </Section>
    </div>
  );
};

Redirect.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string,
};

Redirect.defaultProps = {
  name: null,
};

export default Redirect;
