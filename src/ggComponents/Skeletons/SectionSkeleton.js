import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SectionSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__section')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

SectionSkeleton.propTypes = {
  className: PropTypes.string,
};

SectionSkeleton.defaultProps = {
  className: null,
};

export default SectionSkeleton;
