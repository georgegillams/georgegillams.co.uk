import React, { Fragment } from 'react';
import CommentsListSkeleton from './CommentsListSkeleton';

const Skeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <CommentsListSkeleton />
    </div>
  );
};

export default Skeleton;
