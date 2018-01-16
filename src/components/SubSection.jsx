import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './typography.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SubSection = (props) => {
  const {
    link, fancy, light, name, className, noPadding, textClassName, children, ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  const textClassNameFinal = [getClassName('typography__text-subsection')];
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    textClassNameFinal.push(getClassName('typography--light'));
  }
  if (link) {
    classNameFinal.push(getClassName('typography--link'));
    textClassNameFinal.push(getClassName('typography--link'));
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
