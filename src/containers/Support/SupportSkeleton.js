import React from 'react';
import CardSkeleton from 'ggComponents/Skeletons/CardSkeleton';
import STYLES from './support.module.scss';
import { cssModules } from 'ggComponents/helpers/cssModules';
const getClassName = cssModules(STYLES);

const SupportSkeleton = () => <CardSkeleton className={getClassName('support__body-skeleton')} />;

export default SupportSkeleton;
