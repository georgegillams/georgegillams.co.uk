import React from 'react';
import CardSkeleton from 'gg-components/Skeletons/CardSkeleton';
import SectionSkeleton from 'gg-components/Skeletons/SectionSkeleton';
import STYLES from './blog-renderer.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const BlogSkeleton = () => (
  <>
    <SectionSkeleton />
    <CardSkeleton className={getClassName('blog-renderer__body-skeleton')} />
  </>
);

export default BlogSkeleton;
