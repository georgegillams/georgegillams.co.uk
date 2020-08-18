import React from 'react';
import PropTypes from 'prop-types';
import { TextLink as GGTextLink } from 'gg-components/TextLink';
import Link from 'next/link';
import nextifyHref from 'utils/nextifyHref';

const TextLink = props => {
  const { href, hrefExternal, ...rest } = props;
  if (hrefExternal) {
    return <GGTextLink {...props} />;
  }

  const destination = nextifyHref(href);
  return (
    <Link href={destination.url} as={destination.as} {...destination.options} passHref>
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
