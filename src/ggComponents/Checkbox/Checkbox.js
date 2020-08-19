import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import Tick from '../Icons/tick';

import STYLES from './checkbox.module.scss';

const getClassName = cssModules(STYLES);

const Checkbox = props => {
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
  const { onChange, labelClassName, className, name, label, checked, disabled, valid, inputProps, ...rest } = props;

  const focusedState = hovering || focused;
  const enabled = disabled !== true;
  const invalid = valid === false;

  const checkClassNames = [getClassName('checkbox__check')];
  const checkboxClassNames = [getClassName('checkbox__input')];
  const labelClassNames = [getClassName('checkbox__label', labelClassName)];

  if (checked) {
    checkClassNames.push(getClassName('checkbox__check--checked'));
  }

  if (focusedState && enabled) {
    checkboxClassNames.push(getClassName('checkbox__input--hovering'));
  }

  if (enabled) {
    if (valid) {
      checkClassNames.push(getClassName('checkbox__check--valid'));
      checkboxClassNames.push(getClassName('checkbox__input--valid'));
    }
    if (invalid) {
      checkClassNames.push(getClassName('checkbox__check--invalid'));
      checkboxClassNames.push(getClassName('checkbox__input--invalid'));
    }
  } else {
    checkClassNames.push(getClassName('checkbox__check--disabled'));
    checkboxClassNames.push(getClassName('checkbox__input--disabled'));
    labelClassNames.push(getClassName('checkbox__label--disabled'));
  }

  return (
    <div className={getClassName('checkbox', className)} {...rest}>
      <input
        aria-invalid={invalid}
        aria-disabled={disabled ? true : null}
        aria-label={label}
        onMouseEnter={hoverStarted}
        onFocus={focusStarted}
        onMouseLeave={hoverEnded}
        onBlur={focusEnded}
        className={checkboxClassNames.join(' ')}
        name={name}
        type="checkbox"
        checked={checked}
        readOnly={!onChange}
        onChange={enabled ? onChange : null}
        {...inputProps}
      />
      <Tick className={checkClassNames.join(' ')} />
      {label && (
        <span aria-hidden="true" className={labelClassNames.join(' ')}>
          {' '}
          {label}{' '}
        </span>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: PropTypes.object,
  checked: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: null,
  inputProps: {},
  label: null,
  className: null,
  labelClassName: null,
  checked: false,
  disabled: false,
  valid: null,
};

export default Checkbox;
