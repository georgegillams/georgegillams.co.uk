import React from 'react';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';

const ReadingListSkeleton = () => (
  <>
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
  </>
);

export default ReadingListSkeleton;
