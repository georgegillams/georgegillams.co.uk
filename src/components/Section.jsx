import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = (props) => {
  const {
    name, className, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__section')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <BpkText tagName="h2" textStyle="xxl" className={getClassName('section__section--text')}>
        {name}
      </BpkText>
      {children}
    </div>
  );
};

Section.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

Section.defaultProps = {
  className: null,
  style: null,
  children: null,
};

export default Section;
