import React from 'react';
import CardSkeleton from '@george-gillams/components/skeleton/card-skeleton';
import SectionSkeleton from '@george-gillams/components/skeleton/section-skeleton';
import STYLES from './blog-renderer.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const BlogSkeleton = () => (
  <>
    <SectionSkeleton />
    <CardSkeleton className={getClassName('blog-renderer__body-skeleton')} />
  </>
);

export default BlogSkeleton;
