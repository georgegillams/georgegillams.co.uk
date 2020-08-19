import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CheckboxSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__checkbox')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

CheckboxSkeleton.propTypes = {
  className: PropTypes.string,
};

CheckboxSkeleton.defaultProps = {
  className: null,
};

export default CheckboxSkeleton;
