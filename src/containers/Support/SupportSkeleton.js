import React from 'react';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import STYLES from './support.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const SupportSkeleton = () => (
  <Skeleton skeletonStyle={SKELETON_STYLES.card} className={getClassName('support__body-skeleton')} />
);

export default SupportSkeleton;
