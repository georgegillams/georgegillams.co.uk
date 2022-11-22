import React from 'react';
import GGFeatureCard, { FEATURE_CARD_LAYOUTS, applyStylesToAnchor } from '@george-gillams/components/feature-card';
import Link from 'next/link';

const anchorComponent = applyStylesToAnchor(Link);
const FeatureCard = props => <GGFeatureCard anchorComponent={anchorComponent} {...props} />;

export default FeatureCard;
export { FEATURE_CARD_LAYOUTS };
