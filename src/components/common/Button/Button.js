import React from 'react';
import GGButton, { applyStylesToAnchor } from '@george-gillams/components/button';
import Link from 'next/link';

const anchorComponent = applyStylesToAnchor(Link);
const Button = props => <GGButton anchorComponent={anchorComponent} {...props} />;

export default Button;
