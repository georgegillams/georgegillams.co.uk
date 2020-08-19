import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const ButtonSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = getClassName('skeleton__button', className);

  return <Skeleton className={classNames} {...rest} />;
};

ButtonSkeleton.propTypes = {
  className: PropTypes.string,
};

ButtonSkeleton.defaultProps = {
  className: null,
};

export default ButtonSkeleton;
