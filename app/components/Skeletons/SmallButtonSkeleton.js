import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const SmallButtonSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__button--small'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default SmallButtonSkeleton;