import React from 'react';
import { SectionSkeleton, ButtonSkeleton } from 'components/Skeletons';

const AccountSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <ButtonSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default AccountSkeleton;
