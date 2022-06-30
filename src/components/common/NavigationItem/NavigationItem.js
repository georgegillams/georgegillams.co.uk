import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

const NavigationItem = props => {
  const { name, href, ...rest } = props;

  return (
    <Button href={href} buttonType={BUTTON_TYPES.bouncy} {...rest}>
      {name}
    </Button>
  );
};

NavigationItem.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
NavigationItem.defaultProps = {};

export default NavigationItem;
