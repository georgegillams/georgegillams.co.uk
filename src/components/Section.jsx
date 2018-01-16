import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './typography.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = (props) => {
  const {
    link, fancy, light, noPadding, name, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  const textClassNameFinal = [getClassName('typography__text'), getClassName('typography__text--section')];
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    textClassNameFinal.push(getClassName('typography--light'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('typography--no-padding'));
    textClassNameFinal.push(getClassName('typography--no-padding'));
  }
  if (fancy) {
    classNameFinal.push(getClassName('typography--fancy'));
    textClassNameFinal.push(getClassName('typography--fancy'));
  }
  if (className) { classNameFinal.push(className); }
  if (textClassName) { textClassNameFinal.push(textClassName); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {name &&
        <BpkText tagName="h2" textStyle="xxl" className={textClassNameFinal.join(' ')}>
          {name}
        </BpkText>
      }
      {children}
    </div>
  );
};

Section.propTypes = {
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

Section.defaultProps = {
  link: false,
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
