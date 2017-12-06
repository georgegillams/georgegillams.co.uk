import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Section = (props) => {
  const {
    name, style, className, children,
  } = props;

  const outerClassName = [getClassName('section__section')];
  if (className) { outerClassName.push(className); }

  return (
    <div className={outerClassName.join(' ')} style={style}>
      <BpkText tagName="h2" textStyle="lg" className={getClassName('app__text')}>
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
