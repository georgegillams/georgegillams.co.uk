/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tick from '../Icons/tick';
import ExclamationCircle from '../Icons/exclamation-circle';
import { cssModules } from '../helpers/cssModules';

import STYLES from './input.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Input = props => {
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  const hoverStarted = () => {
    setHovering(true);
  };

  const hoverEnded = () => {
    setHovering(false);
  };

  const focusStarted = () => {
    setFocused(true);
  };

  const focusEnded = () => {
    setFocused(false);
  };

  const {
    name,
    value,
    onChange,
    enabled,
    type,
    valid,
    className,
    inputProps,
    iconProps,
    component: InputComponent,
    id,
    ...rest
  } = props;

  const disabled = enabled === false;
  const invalid = valid === false;
  const focusedState = hovering || focused;

  const classNames = [getClassName('input__outer')];
  const innerClassNames = [getClassName('input__inner')];
  const iconClassNames = [getClassName('input__icon')];
  if (disabled) {
    classNames.push(getClassName('input__outer--disabled'));
    innerClassNames.push(getClassName('input__inner--disabled'));
  }
  if (focusedState && enabled) {
    classNames.push(getClassName('input__outer--hovering'));
  }
  if (className) {
    classNames.push(className);
  }

  let IconComponent = null;
  if (valid && enabled) {
    iconClassNames.push(getClassName('input__icon--valid'));
    IconComponent = Tick;
  }
  if (valid === false && enabled) {
    iconClassNames.push(getClassName('input__icon--invalid'));
    IconComponent = ExclamationCircle;
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      <InputComponent
        aria-invalid={invalid}
        aria-disabled={disabled}
        onMouseEnter={hoverStarted}
        onFocus={focusStarted}
        onMouseLeave={hoverEnded}
        onBlur={focusEnded}
        value={value || ''}
        type={type}
        name={name}
        disabled={disabled}
        readOnly={!onChange}
        onChange={enabled ? onChange : null}
        className={innerClassNames.join(' ')}
        id={id}
        {...inputProps}
      />
      {IconComponent && <IconComponent className={iconClassNames.join(' ')} {...iconProps} />}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  component: PropTypes.func,
  enabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  iconProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: PropTypes.object,
  type: PropTypes.string,
  valid: PropTypes.bool,
};

Input.defaultProps = {
  id: null,
  value: null,
  name: null,
  onChange: null,
  className: null,
  component: iProps => <input {...iProps} />,
  enabled: true,
  iconProps: null,
  inputProps: null,
  type: null,
  valid: null,
};

export default Input;
