import React, { Fragment } from 'react';
import BlogListSkeleton from './BlogListSkeleton';

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <BlogListSkeleton />
    </div>
  );
};

export default AccountSkeleton;
