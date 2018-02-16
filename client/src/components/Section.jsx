import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './typography.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = props => {
  const {
    link,
    fancy,
    light,
    noPadding,
    noAnchor,
    name,
    className,
    textClassName,
    children,
    hover,
    ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  const textClassNameFinal = [
    getClassName('typography__text'),
    getClassName('typography__text--section'),
  ];
  if (!noAnchor) {
    textClassNameFinal.push(getClassName('typography__text--with-anchor-link'));
  }
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    textClassNameFinal.push(getClassName('typography--light'));
  }
  if (hover) {
    textClassNameFinal.push(getClassName('typography--hovering'));
  }
  if (link) {
    classNameFinal.push(getClassName('typography__link'));
    textClassNameFinal.push(getClassName('typography__link'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('typography--no-padding'));
    textClassNameFinal.push(getClassName('typography--no-padding'));
  }
  if (fancy) {
    classNameFinal.push(getClassName('typography--fancy'));
    textClassNameFinal.push(getClassName('typography--fancy'));
  }
  if (className) {
    classNameFinal.push(className);
  }
  if (textClassName) {
    textClassNameFinal.push(textClassName);
  }

  const anchorLink = `${name}`
    .toLowerCase()
    .split(' ')
    .join('-');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {name && (
        <BpkText
          id={anchorLink}
          tagName="h2"
          textStyle="xxl"
          className={textClassNameFinal.join(' ')}
        >
          {name}
        </BpkText>
      )}
      {children}
    </div>
  );
};

Section.propTypes = {
  noAnchor: PropTypes.bool,
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  hover: PropTypes.bool,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

Section.defaultProps = {
  noAnchor: true,
  link: false,
  hover: false,
  fancy: false,
  light: false,
  name: null,
  noPadding: false,
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default Section;
