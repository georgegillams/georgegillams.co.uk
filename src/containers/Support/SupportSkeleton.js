import React from 'react';
import CardSkeleton from 'gg-components/Skeletons/CardSkeleton';
import STYLES from './support.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const SupportSkeleton = () => <CardSkeleton className={getClassName('support__body-skeleton')} />;

export default SupportSkeleton;
