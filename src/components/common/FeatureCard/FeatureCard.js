import React from 'react';
import PropTypes from 'prop-types';
import GGFeatureCard, { FEATURE_CARD_LAYOUTS } from '@george-gillams/components/feature-card';
import nextifyHref from '@george-gillams/webapp/utils/nextifyHref';
import Link from 'next/link';

const FeatureCard = props => {
  const { href, hrefExternal, onClick, ...rest } = props;

  const renderNormalCard = !href || hrefExternal;

  const destination = nextifyHref(href);

  if (renderNormalCard) {
    return <GGFeatureCard href={href} hrefExternal={hrefExternal} onClick={onClick} {...rest} />;
  }

  return (
    <Link passHref href={destination.url} as={destination.as} {...destination.options} legacyBehavior>
      <GGFeatureCard {...rest} />
    </Link>
  );
};

FeatureCard.propTypes = {
  href: PropTypes.string.isRequired,
  hrefExternal: PropTypes.bool,
  scroll: PropTypes.bool,
  onClick: PropTypes.func,
};

FeatureCard.defaultProps = {
  hrefExternal: false,
  scroll: true,
  onClick: null,
};

export default FeatureCard;
export { FEATURE_CARD_LAYOUTS };
