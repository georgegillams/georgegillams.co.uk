import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from '../Paragraph';

const Reference = props => {
  const { reference, identifier, ...rest } = props;

  return (
    <Paragraph id={`reference_${identifier}`} {...rest}>
      {`[${identifier}] ${reference}`}
    </Paragraph>
  );
};

Reference.propTypes = {
  reference: PropTypes.string.isRequired,
  identifier: PropTypes.number.isRequired,
};

export default Reference;
