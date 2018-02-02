import PropTypes from 'prop-types';
import React from 'react';
import BpkSmallNewWindowIcon from 'bpk-component-icon/sm/new-window';

import STYLES from './typography.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TextLink = (props) => {
  const {
    external, fancy, light, href, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  classNameFinal.push(getClassName('typography__link'));
  classNameFinal.push(getClassName('typography__link--text-link'));
  classNameFinal.push(getClassName('typography--no-padding'));
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    classNameFinal.push(getClassName('typography--light--text-link'));
  }
  if (fancy) classNameFinal.push(getClassName('typography--fancy'));
  classNameFinal.push(getClassName('typography--inline'));
  const outerClassNameFinal = JSON.parse(JSON.stringify(classNameFinal));
  if (className) {
    outerClassNameFinal.push(className);
  }

  let externalProps = {};
  if (external) {
    externalProps = { rel: 'noopener noreferrer', target: '_blank' };
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <a href={href} {...externalProps} className={classNameFinal.join(' ')}>
        {children}
        {external && <BpkSmallNewWindowIcon className={getClassName('typography__icon')} /> }
      </a>
    </div>
  );
};

TextLink.propTypes = {
  fancy: PropTypes.bool,
  external: PropTypes.bool,
  light: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
};

TextLink.defaultProps = {
  external: false,
  fancy: false,
  light: false,
  href: null,
  children: null,
  textClassName: null,
  className: null,
};

export default TextLink;
