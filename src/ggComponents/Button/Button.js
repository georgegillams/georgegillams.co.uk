/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './gg-button.module.scss';

const getClassName = cssModules(STYLES);

const Button = React.forwardRef((props, ref) => {
  const [showDestructiveConfirmation, setShowDestructiveConfirmation] = useState(false);

  const {
    href,
    hrefExternal,
    hrefDumb,
    destructive,
    disabled,
    light,
    bouncy,
    onClick,
    className,
    buttonClassName,
    large,
    children,
    secondary,
    white,
    ...rest
  } = props;

  const classNameFinal = [getClassName('button__outer')];
  if (!destructive && !bouncy) {
    classNameFinal.push(getClassName('button__outer--regular'));
  }
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
      classNameFinal.push(getClassName('button__outer--no-bouncy--destructive'));
    }
    if (disabled) {
      classNameFinal.push(getClassName('button__outer--disabled'));
    }
  }
  if (large) {
    classNameFinal.push(getClassName('button__outer--large'));
  }
  if (secondary) {
    classNameFinal.push(getClassName('button__outer--secondary'));
  }

  if (white) {
    classNameFinal.push(getClassName('button__outer--white'));
  }

  if (href && !disabled) {
    classNameFinal.push(getClassName('button__outer--link'));
  }

  if (buttonClassName) classNameFinal.push(buttonClassName);

  if (href && !disabled) {
    return (
      <a
        aria-label={children}
        href={hrefDumb ? null : href}
        target={hrefExternal ? '_blank' : null}
        rel={hrefExternal ? 'noopener noreferrer' : null}
        onClick={onClick}
        ref={ref}
        className={getClassName('button__a', className)}
        {...rest}>
        <button aria-hidden="true" type="button" className={classNameFinal.join(' ')}>
          {children}
        </button>
      </a>
    );
  }

  let onClickFinal = onClick;
  if (disabled) {
    onClickFinal = null;
  }

  if (className) classNameFinal.push(className);

  const onDestructiveClickFinal = event => {
    if (showDestructiveConfirmation) {
      setShowDestructiveConfirmation(false);
      onClickFinal(event);
    } else {
      setShowDestructiveConfirmation(true);
      setTimeout(() => {
        setShowDestructiveConfirmation(false);
      }, 7500);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={destructive ? onDestructiveClickFinal : onClickFinal}
      className={classNameFinal.join(' ')}
      ref={ref}
      {...rest}>
      {showDestructiveConfirmation && 'Click again to confirm '}
      {children}
    </button>
  );
});

Button.propTypes = {
  large: PropTypes.bool,
  href: PropTypes.string,
  hrefExternal: PropTypes.bool,
  hrefDumb: PropTypes.bool,
  buttonClassName: PropTypes.string,
  secondary: PropTypes.bool,
  white: PropTypes.bool,
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
  buttonClassName: null,
  hrefExternal: false,
  hrefDumb: false,
  secondary: false,
  white: false,
  light: false,
  disabled: false,
  bouncy: false,
  destructive: false,
  onClick: null,
  className: null,
  children: null,
};

export default Button;
