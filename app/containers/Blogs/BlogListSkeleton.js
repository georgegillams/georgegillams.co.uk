import React, { Fragment } from 'react';
import { SectionSkeleton, CardSkeleton } from 'components/Skeletons';

const AccountSkeleton = props => {
  return (
    <Fragment>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Fragment>
  );
};

export default AccountSkeleton;