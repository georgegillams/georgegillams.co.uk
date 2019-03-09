import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from 'components/Typography';

const Status = props => {
  const { success, error, activityName } = props;

  if (success || error) {
    return (
      <Section name="STATUS">
        {success && <span>SUCCESS</span>}
        {error && <span>{error}</span>}
      </Section>
    );
  }

  return null;
};

Status.propTypes = {
  activityName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  success: PropTypes.bool,
  error: PropTypes.string,
};

Status.defaultProps = {
  success: false,
  error: null,
};

export default Status;
