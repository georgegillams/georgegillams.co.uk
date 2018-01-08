import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SubSection = (props) => {
  const {
    name, className, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__sub-section')];
  if (className) { classNameFinal.push(className); }
  const textClassNameFinal = [getClassName('section__sub-section--text')];
  if (textClassName) { textClassNameFinal.push(textClassName); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <BpkText tagName="h3" textStyle="lg" className={textClassNameFinal.join(' ')}>
        {name}
      </BpkText>
      {children}
    </div>
  );
};

SubSection.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

SubSection.defaultProps = {
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default SubSection;
