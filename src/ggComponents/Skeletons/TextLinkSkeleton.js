import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const TextLinkSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__text-link')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

TextLinkSkeleton.propTypes = {
  className: PropTypes.string,
};

TextLinkSkeleton.defaultProps = {
  className: null,
};

export default TextLinkSkeleton;
