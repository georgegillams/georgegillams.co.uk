import React, { Fragment } from 'react';
import { CompactCardSkeleton, SectionSkeleton } from 'components/Skeletons';

const AdminUsersSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <div className="pages__compact-card-container">
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

export default AdminUsersSkeleton;
