import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const NavigationItem = props => {
  const { name, linkUrl, className, ...rest } = props;

  const outerClassNameFinal = [];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <a href={linkUrl}>
        <Button bouncy>{name}</Button>
      </a>
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
