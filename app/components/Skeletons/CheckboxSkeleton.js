import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const CheckboxSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__checkbox'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default CheckboxSkeleton;
