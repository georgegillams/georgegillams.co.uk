import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SmallButtonSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__button--small')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

SmallButtonSkeleton.propTypes = {
  className: PropTypes.string,
};

SmallButtonSkeleton.defaultProps = {
  className: null,
};

export default SmallButtonSkeleton;
