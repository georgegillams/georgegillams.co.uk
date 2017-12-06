import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SubSection = (props) => {
  const {
    name, style, className, children,
  } = props;

  const outerClassName = [getClassName('section__sub-section')];
  if (className) { outerClassName.push(className); }

  return (
    <div className={outerClassName.join(' ')} style={style}>
      <BpkText tagName="h3" textStyle="md" className={getClassName('app__text')}>
        {name}
      </BpkText>
      {children}
    </div>
  );
};

SubSection.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

SubSection.defaultProps = {
  className: null,
  style: null,
  children: null,
};

export default SubSection;
