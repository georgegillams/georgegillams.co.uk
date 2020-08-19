import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const ProgressSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__progress')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

ProgressSkeleton.propTypes = {
  className: PropTypes.string,
};

ProgressSkeleton.defaultProps = {
  className: null,
};

export default ProgressSkeleton;
