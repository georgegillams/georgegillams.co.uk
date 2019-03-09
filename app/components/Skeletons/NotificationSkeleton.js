import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const NotificationSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__notification'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default NotificationSkeleton;
