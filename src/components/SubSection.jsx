import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SubSection = (props) => {
  const {
    name, className, children, ...rest
  } = props;

  const classNameFinal = [getClassName('section__sub-section')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <BpkText tagName="h3" textStyle="lg" className={getClassName('section__sub-section--text')}>
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
