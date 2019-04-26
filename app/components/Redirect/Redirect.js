import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Section, TextLink } from 'components/Typography';

const GGRedirect = props => {
  const { name, to, ...rest } = props;

  if (to.includes('http')) {
    document.location = to;
    return null;
  }

  return (
    <div {...rest}>
      <Redirect to={to} />
      <Section name={props.name || 'Redirecting...'}>
        <TextLink to={props.to}>Not been redirected? Click here.</TextLink>
      </Section>
    </div>
  );
};

GGRedirect.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string,
};

GGRedirect.defaultProps = {
  name: null,
};

export default GGRedirect;
