import React, { Fragment } from 'react';
import { SectionSkeleton, CardSkeleton } from 'components/Skeletons';

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default AccountSkeleton;