import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = (props) => {
  const {
    fancy, light, noPadding, name, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__section')];
  const textClassNameFinal = [getClassName('section__section--text')];
  if (light) { textClassNameFinal.push(getClassName('section__section--text--light')); }
  if (noPadding) {
    classNameFinal.push(getClassName('section__sub-section--no-padding'));
    textClassNameFinal.push(getClassName('section__sub-section--text--no-padding'));
  }
  if (fancy) textClassNameFinal.push(getClassName('section__sub-section--text--fancy'));
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
  name: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

Section.defaultProps = {
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default Section;
