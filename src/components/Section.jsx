import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = (props) => {
  const {
    name, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__section')];
  if (className) { classNameFinal.push(className); }
  const textClassNameFinal = [getClassName('section__section--text')];
  if (textClassName) { textClassNameFinal.push(textClassName); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <BpkText tagName="h2" textStyle="xxl" className={textClassNameFinal.join(' ')}>
        {name}
      </BpkText>
      {children}
    </div>
  );
};

Section.propTypes = {
  name: PropTypes.string.isRequired,
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
