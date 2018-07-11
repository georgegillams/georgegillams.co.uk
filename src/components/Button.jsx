import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';

import STYLES from './button.scss';

const getClassName = cssModules(STYLES);

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
    large,
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
  if (large) {
    classNameFinal.push(getClassName('button__outer--large'));
  }

  if (className) classNameFinal.push(className);
  if (href && !hrefExternal && !disabled) {
    return (
      <NavLink to={href} className={classNameFinal.join(' ')} {...rest}>
        {children}
      </NavLink>
    );
  }

  let onClickFinal = onClick;
  if (disabled) {
    onClickFinal = null;
  } else if (href && hrefExternal) {
    onClickFinal = () => {
      window.open(href, '_blank');
    };
  }

  return (
    <button
      disabled={disabled}
      onClick={onClickFinal}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  large: PropTypes.bool,
  href: PropTypes.string,
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
  large: false,
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
