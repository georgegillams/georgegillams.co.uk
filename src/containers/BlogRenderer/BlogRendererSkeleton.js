import React from 'react';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import { BodySkeleton } from './blog-renderer.styles';

const BlogSkeleton = () => (
  <>
    <Skeleton skeletonStyle={SKELETON_STYLES.section} />
    <BodySkeleton />
  </>
);

export default BlogSkeleton;
