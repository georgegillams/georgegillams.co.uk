import React, { Fragment } from 'react';
import {
  SectionSkeleton,
  InputSkeleton,
  CheckboxSkeleton,
  ButtonSkeleton,
} from 'components/Skeletons';

const LoginFormSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <InputSkeleton />
      <CheckboxSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;
