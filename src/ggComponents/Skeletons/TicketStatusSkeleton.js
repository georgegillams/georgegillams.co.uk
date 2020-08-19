import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import Skeleton from './Skeleton';
import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const TicketStatusSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = [getClassName('skeleton__ticket-status')];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

TicketStatusSkeleton.propTypes = {
  className: PropTypes.string,
};

TicketStatusSkeleton.defaultProps = {
  className: null,
};

export default TicketStatusSkeleton;
