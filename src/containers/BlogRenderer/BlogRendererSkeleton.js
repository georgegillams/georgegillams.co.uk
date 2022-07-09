import React from 'react';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import STYLES from './blog-renderer.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const BlogSkeleton = () => (
  <>
    <Skeleton skeletonStyle={SKELETON_STYLES.card} />
    <Skeleton skeletonStyle={SKELETON_STYLES.card} className={getClassName('blog-renderer__body-skeleton')} />
  </>
);

export default BlogSkeleton;
