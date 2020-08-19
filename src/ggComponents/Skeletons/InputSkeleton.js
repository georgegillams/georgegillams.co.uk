import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const InputSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__input')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

InputSkeleton.propTypes = {
  className: PropTypes.string,
};

InputSkeleton.defaultProps = {
  className: null,
};

export default InputSkeleton;
