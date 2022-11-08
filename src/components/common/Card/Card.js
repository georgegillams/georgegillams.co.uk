import React from 'react';
import PropTypes from 'prop-types';
import GGCard from '@george-gillams/components/card';
import HelperFunctions from '@george-gillams/webapp/helpers/HelperFunctions';
import nextifyHref from '@george-gillams/webapp/utils/nextifyHref';
import Link from 'next/link';

const Card = props => {
  const { href, onClick, ...rest } = props;

  const hrefExternal = href && HelperFunctions.includes(href, 'http');

  const renderNormalCard = !href || hrefExternal;

  const destination = nextifyHref(href);

  if (renderNormalCard) {
    return <GGCard href={href} onClick={onClick} {...rest} />;
  }

  return (
    <Link passHref href={destination.url} as={destination.as} {...destination.options} legacyBehavior>
      <GGCard {...rest} />
    </Link>
  );
};

Card.propTypes = {
  href: PropTypes.string.isRequired,
  scroll: PropTypes.bool,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  scroll: true,
  onClick: null,
};

export default Card;
