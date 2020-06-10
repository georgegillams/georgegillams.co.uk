import React from 'react';
import {
  InputSkeleton,
  SectionSkeleton,
  ButtonSkeleton,
} from 'gg-components/Skeletons';

const Skeleton = () => (
  <div>
    <SectionSkeleton style={{ marginTop: '3rem' }} />
    <InputSkeleton style={{ marginTop: '2rem' }} />
    <InputSkeleton style={{ marginTop: '2rem' }} />
    <InputSkeleton style={{ marginTop: '2rem' }} />
    <ButtonSkeleton />
  </div>
);

export default Skeleton;
