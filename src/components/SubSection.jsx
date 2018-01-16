import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SubSection = (props) => {
  const {
    link, fancy, light, name, className, noPadding, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__sub-section')];
  const textClassNameFinal = [getClassName('section__sub-section--text')];
  if (light) { textClassNameFinal.push(getClassName('section__sub-section--text--light')); }
  if (noPadding) {
    classNameFinal.push(getClassName('section__sub-section--no-padding'));
    textClassNameFinal.push(getClassName('section__sub-section--text--no-padding'));
  }
  if (fancy) {
    classNameFinal.push(getClassName('section__sub-section--text--fancy'));
    textClassNameFinal.push(getClassName('section__sub-section--text--fancy'));
  }
  if (className) { classNameFinal.push(className); }
  if (textClassName) { textClassNameFinal.push(textClassName); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {name &&
        <BpkText tagName="h3" textStyle="lg" className={textClassNameFinal.join(' ')}>
          {name}
        </BpkText>
        }
      {children}
    </div>
  );
};

SubSection.propTypes = {
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

SubSection.defaultProps = {
  link: false,
  fancy: false,
  light: false,
  noPadding: false,
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default SubSection;
