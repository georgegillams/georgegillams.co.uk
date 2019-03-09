import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const SubSectionSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__subsection'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default SubSectionSkeleton;
