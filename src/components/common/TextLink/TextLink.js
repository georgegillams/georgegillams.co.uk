import React from 'react';
import PropTypes from 'prop-types';
import GGTextLink from '@george-gillams/components/text-link';
import Link from 'next/link';
import nextifyHref from '@george-gillams/webapp/utils/nextifyHref';

const TextLink = props => {
  const { href, hrefExternal, ...rest } = props;
  if (hrefExternal) {
    return <GGTextLink {...props} />;
  }

  const destination = nextifyHref(href);
  return (
    <Link passHref href={destination.url} as={destination.as} {...destination.options} legacyBehavior>
      <GGTextLink href={href} {...rest} />
    </Link>
  );
};

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  hrefExternal: PropTypes.bool,
};
TextLink.defaultProps = {
  hrefExternal: false,
};

export default TextLink;
