import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const InputSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__input'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default InputSkeleton;
