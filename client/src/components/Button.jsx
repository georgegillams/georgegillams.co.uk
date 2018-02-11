import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './button.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Button = props => {
  const {
    destructive,
    disabled,
    light,
    bouncy,
    onClick,
    className,
    children,
    ...rest
  } = props;

  const classNameFinal = [getClassName('button__outer')];
  if (destructive) {
    classNameFinal.push(getClassName('button__outer--destructive'));
  }
  if (bouncy) {
    if (!light) {
      classNameFinal.push(getClassName('button__outer--dark-text'));
    }
    classNameFinal.push(getClassName('button__outer--bouncy'));
    if (destructive) {
      classNameFinal.push(getClassName('button__outer--bouncy--destructive'));
    }
    if (disabled) {
      classNameFinal.push(getClassName('button__outer--disabled'));
    }
  } else {
    classNameFinal.push(getClassName('button__outer--no-bouncy'));
    if (destructive) {
      classNameFinal.push(
        getClassName('button__outer--no-bouncy--destructive'),
      );
    }
    if (disabled) {
      classNameFinal.push(getClassName('button__outer--disabled'));
    }
  }

  if (className) classNameFinal.push(className);

  return (
    <button
      disabled={disabled}
      onClick={disabled ? null : onClick}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  light: PropTypes.bool,
  bouncy: PropTypes.bool,
  destructive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  light: false,
  disabled: false,
  bouncy: false,
  destructive: false,
  onClick: null,
  className: null,
  children: null,
};

export default Button;
