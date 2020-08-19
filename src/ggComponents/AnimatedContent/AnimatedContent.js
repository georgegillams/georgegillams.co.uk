import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './animated-content.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const AnimatedContent = props => {
  const { inView, className, children, ...rest } = props;
  const classNameFinal = [getClassName('animated-content__outer-container')];
  if (inView) {
    classNameFinal.push(getClassName('animated-content__outer-container--in-view'));
  }
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {children}
    </div>
  );
};

AnimatedContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  inView: PropTypes.bool,
};

AnimatedContent.defaultProps = {
  className: null,
  inView: true,
};

export default AnimatedContent;
