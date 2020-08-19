import PropTypes from 'prop-types';
import React from 'react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './section.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Section = props => {
  const {
    link,
    fancy,
    light,
    noPadding,
    anchor,
    name,
    className,
    textClassName,
    children,
    disabled,
    hover,
    headingProps,
    ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  const textClassNameFinal = [getClassName('typography__text', 'typography__text--section')];
  const anchorClassNames = [getClassName('typography__anchor-link', 'typography__anchor-link--section')];
  if (hover) {
    if (light) {
      textClassNameFinal.push(getClassName('typography--hovering-light'));
    } else {
      textClassNameFinal.push(getClassName('typography--hovering'));
    }
  }
  if (anchor) {
    textClassNameFinal.push(getClassName('typography__text--with-anchor-link'));
  }
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    textClassNameFinal.push(getClassName('typography--light'));
  }
  if (link) {
    textClassNameFinal.push(getClassName('typography__link'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('typography--no-padding'));
    textClassNameFinal.push(getClassName('typography--no-padding'));
    anchorClassNames.push(getClassName('typography__anchor-link--section--no-padding'));
  }
  if (fancy) {
    classNameFinal.push(getClassName('typography--fancy'));
    textClassNameFinal.push(getClassName('typography--fancy'));
  }
  if (disabled) {
    textClassNameFinal.push(getClassName('typography--disabled'));
  }
  if (className) {
    classNameFinal.push(className);
  }
  if (textClassName) {
    textClassNameFinal.push(textClassName);
  }

  const anchorLink = `${name}`.toLowerCase().split(' ').join('-');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {anchor && name && (
        <a aria-label={name} href={`#${anchorLink}`} className={anchorClassNames.join(' ')}>
          §
        </a>
      )}
      {name && (
        <h1 id={anchorLink} className={textClassNameFinal.join(' ')} {...headingProps}>
          {name}
        </h1>
      )}
      {children}
    </div>
  );
};

Section.propTypes = {
  anchor: PropTypes.bool,
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
  textClassName: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  headingProps: PropTypes.object,
  children: PropTypes.node,
};

Section.defaultProps = {
  anchor: false,
  link: false,
  disabled: false,
  hover: false,
  fancy: false,
  light: false,
  name: null,
  noPadding: false,
  className: null,
  textClassName: null,
  headingProps: null,
  style: null,
  children: null,
};

export default Section;
