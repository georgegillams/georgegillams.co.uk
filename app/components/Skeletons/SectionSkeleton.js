import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const SectionSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__section'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default SectionSkeleton;
