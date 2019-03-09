import React from 'react';
import Skeleton from './Skeleton';

import './skeleton.scss';

const TextLinkSkeleton = props => {
  const { className, ...rest } = props;

  const classNames = ['skeleton__text-link'];
  if (className) {
    classNames.push(className);
  }

  return <Skeleton className={classNames.join(' ')} {...rest} />;
};

export default TextLinkSkeleton;
