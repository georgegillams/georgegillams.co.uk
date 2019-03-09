import React, { Fragment } from 'react';
import {
  SmallProgressSkeleton,
  SectionSkeleton,
  CompactCardSkeleton,
} from 'components/Skeletons';

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [
    'pages__container',
    'pages__container--centered',
  ];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <SmallProgressSkeleton />
    </div>
  );
};

export default AccountSkeleton;
