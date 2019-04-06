import React from 'react';
import TicketStatusSkeleton from 'containers/TicketStatus/Skeleton';
import LowerPageSkeleton from './LowerPageSkeleton';

const LoginFormSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <TicketStatusSkeleton />
      <LowerPageSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
