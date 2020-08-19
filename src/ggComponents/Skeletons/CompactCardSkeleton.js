import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CompactCardSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__card--compact')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};
CompactCardSkeleton.propTypes = {
  className: PropTypes.string,
};

CompactCardSkeleton.defaultProps = {
  className: null,
};

export default CompactCardSkeleton;
