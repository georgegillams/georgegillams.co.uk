import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './typography.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TextLink = (props) => {
  const {
    fancy, light, noPadding, href, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  classNameFinal.push(getClassName('typography--link'));
  if (light) { classNameFinal.push(getClassName('typography--light')); }
  if (noPadding) { classNameFinal.push(getClassName('typography--no-padding')); }
  if (fancy) classNameFinal.push(getClassName('typography--fancy'));
  classNameFinal.push(getClassName('typography--inline'));
  const outerClassNameFinal = JSON.parse(JSON.stringify(classNameFinal));
  if (className) { outerClassNameFinal.push(className); }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <a href={href} rel="noopener noreferrer" target="_blank" className={classNameFinal.join(' ')}>
        {children}
      </a>
    </div>
  );
};

TextLink.propTypes = {
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
};

TextLink.defaultProps = {
  fancy: false,
  light: false,
  noPadding: false,
  href: null,
  children: null,
  textClassName: null,
  className: null,
};

export default TextLink;
