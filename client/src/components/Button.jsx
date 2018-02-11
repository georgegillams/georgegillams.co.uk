import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import STYLES from './button.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Button = props => {
  const {
    href,
    hrefExternal,
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

  const buttonComponent = (
    <button
      disabled={disabled}
      onClick={disabled ? null : onClick}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      {children}
    </button>
  );

  if (href) {
    if (hrefExternal) {
      return <a href={href}>{buttonComponent}</a>;
    }
    return <NavLink to={href}>{buttonComponent}</NavLink>;
  }

  return buttonComponent;
};

Button.propTypes = {
  href: PropTypes.bool,
  hrefExternal: PropTypes.bool,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
  bouncy: PropTypes.bool,
  destructive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  href: null,
  hrefExternal: false,
  light: false,
  disabled: false,
  bouncy: false,
  destructive: false,
  onClick: null,
  className: null,
  children: null,
};

export default Button;
