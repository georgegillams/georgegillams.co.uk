import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

import STYLES from './showcase.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Showcase = (props) => {
  const {
    name, children, className, ...rest
  } = props;

  const classNameFinal = [getClassName('showcase__container')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <Section name={name} noPadding />
      {children}
    </div>
  );
};

Showcase.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

Showcase.defaultProps = {
  name: null,
  children: null,
  className: null,
};

export default Showcase;
