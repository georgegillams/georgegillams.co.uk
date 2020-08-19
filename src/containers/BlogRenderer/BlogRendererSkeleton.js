import React from 'react';
import CardSkeleton from 'ggComponents/Skeletons/CardSkeleton';
import SectionSkeleton from 'ggComponents/Skeletons/SectionSkeleton';
import STYLES from './blog-renderer.module.scss';
import { cssModules } from 'ggComponents/helpers/cssModules';
const getClassName = cssModules(STYLES);

const BlogSkeleton = () => (
  <>
    <SectionSkeleton />
    <CardSkeleton className={getClassName('blog-renderer__body-skeleton')} />
  </>
);

export default BlogSkeleton;
