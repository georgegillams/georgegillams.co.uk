import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const CardSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__card'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default CardSkeleton;
