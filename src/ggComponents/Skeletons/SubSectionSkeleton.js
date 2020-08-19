import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SubSectionSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__subsection')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

SubSectionSkeleton.propTypes = {
  className: PropTypes.string,
};

SubSectionSkeleton.defaultProps = {
  className: null,
};

export default SubSectionSkeleton;
