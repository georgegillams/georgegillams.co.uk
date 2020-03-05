import React from 'react';
import {
  InputSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'gg-components/Skeletons';

const Skeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default Skeleton;
