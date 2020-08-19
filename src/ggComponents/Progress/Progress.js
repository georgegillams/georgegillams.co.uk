import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './progress.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Progress = props => {
  const { error, progress, max, className, ...rest } = props;

  const cappedProgress = Math.min(max, progress);
  const progressPercentage = (100 * cappedProgress) / max;

  const classNames = [getClassName('progress__outer')];
  if (className) {
    classNames.push(className);
  }

  const innerClassNames = [getClassName('progress__inner')];
  if (error) {
    classNames.push(getClassName('progress__outer--error'));
    innerClassNames.push(getClassName('progress__inner--error'));
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={cappedProgress}
      aria-valuemin="0"
      aria-valuemax={max}
      className={classNames.join(' ')}
      {...rest}>
      <div aria-hidden="true" className={innerClassNames.join(' ')} style={{ width: `${progressPercentage}%` }} />
    </div>
  );
};

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.bool,
  max: PropTypes.number,
};

Progress.defaultProps = {
  children: null,
  className: null,
  error: false,
  max: 100,
};

export default Progress;
