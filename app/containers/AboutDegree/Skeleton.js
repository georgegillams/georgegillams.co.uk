import React, { Fragment } from 'react';
import {
  SmallButtonSkeleton,
  SubSectionSkeleton,
  CardSkeleton,
  SectionSkeleton,
} from 'components/Skeletons';
import TicketStatusSkeleton from 'containers/TicketStatus/Skeleton';

const LoginFormSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <SubSectionSkeleton />
      <SmallButtonSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
