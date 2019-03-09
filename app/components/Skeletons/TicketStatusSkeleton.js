import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const TicketStatusSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__ticket-status'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default TicketStatusSkeleton;
