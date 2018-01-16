import React from 'react';
import BpkCard from 'bpk-component-card';
import Section from './Section';

import STYLES from './button.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
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
    <button className={classNameFinal.join(' ')} {...rest}>
      {children}
    </button>
  );
};

export default Button;
