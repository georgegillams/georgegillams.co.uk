import React from 'react';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';

const getClassName = c => c;

const SupportSkeleton = () => (
  <Skeleton skeletonStyle={SKELETON_STYLES.card} className={getClassName('support__body-skeleton')} />
);

export default SupportSkeleton;
