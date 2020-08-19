import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const CardSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__card')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

CardSkeleton.propTypes = {
  className: PropTypes.string,
};

CardSkeleton.defaultProps = {
  className: null,
};

export default CardSkeleton;
