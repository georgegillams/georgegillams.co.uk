import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const ProgressSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__progress'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default ProgressSkeleton;
