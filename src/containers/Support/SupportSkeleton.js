import React from 'react';
import CardSkeleton from '@george-gillams/components/Skeletons/CardSkeleton';
import STYLES from './support.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const SupportSkeleton = () => <CardSkeleton className={getClassName('support__body-skeleton')} />;

export default SupportSkeleton;
