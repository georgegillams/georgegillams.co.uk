import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const ButtonSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__button'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default ButtonSkeleton;
