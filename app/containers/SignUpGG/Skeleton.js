import React, { Fragment } from 'react';
import {
  SectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from 'components/Skeletons';

const SignUpSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <InputSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default SignUpSkeleton;
