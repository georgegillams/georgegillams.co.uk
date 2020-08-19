/* eslint-disable  */
import React from 'react';
import PropTypes from 'prop-types';

const Citation = props => {
  const { identifier, onSelection, ...rest } = props;

  const handleClick = event => {
    // TODO Scroll to element?
    if (onSelection) {
      onSelection(event, identifier);
    }
  };

  return (
    <span onClick={handleClick} {...rest}>
      {`[${identifier}]`}
    </span>
  );
};

Citation.propTypes = {
  identifier: PropTypes.string.isRequired,
  onSelection: PropTypes.func,
};

Citation.defaultProps = {
  onSelection: null,
};

export default Citation;
