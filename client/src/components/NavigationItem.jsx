import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
  const { name, linkUrl, className, ...rest } = props;

  const outerClassNameFinal = [];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <NavLink to={linkUrl}>
        <Button bouncy>{name}</Button>
      </NavLink>
    </div>
  );
};

NavigationItem.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
  className: PropTypes.string,
};

NavigationItem.defaultProps = {
  name: null,
  linkUrl: null,
  className: null,
};

export default NavigationItem;
