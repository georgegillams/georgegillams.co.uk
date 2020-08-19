import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const InfoCellSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__info-cell')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};
InfoCellSkeleton.propTypes = {
  className: PropTypes.string,
};

InfoCellSkeleton.defaultProps = {
  className: null,
};

export default InfoCellSkeleton;
