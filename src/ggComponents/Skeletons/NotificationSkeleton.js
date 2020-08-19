import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const NotificationSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__notification')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

NotificationSkeleton.propTypes = {
  className: PropTypes.string,
};

NotificationSkeleton.defaultProps = {
  className: null,
};

export default NotificationSkeleton;
