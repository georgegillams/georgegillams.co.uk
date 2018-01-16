import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './button.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Button = (props) => {
  const {
    bouncy, onClick, className, children, ...rest
  } = props;

  const classNameFinal = [getClassName('button__outer')];
  if (bouncy) {
    classNameFinal.push(getClassName('button__outer--bouncy'));
  } else {
    classNameFinal.push(getClassName('button__outer--no-bouncy'));
  }
  if (className) classNameFinal.push(className);

  return (
    <button onClick={onClick} className={classNameFinal.join(' ')} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  bouncy: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  bouncy: false,
  onClick: null,
  className: null,
  children: null,
};

export default Button;
