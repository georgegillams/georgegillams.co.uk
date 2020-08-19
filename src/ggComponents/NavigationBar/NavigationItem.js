import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';

const NavigationItem = props => {
  const { name, className, ...rest } = props;

  return (
    <Button bouncy buttonClassName={className} {...rest}>
      {name}
    </Button>
  );
};

NavigationItem.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

NavigationItem.defaultProps = {
  name: null,
  className: null,
};

export default NavigationItem;
