import React from 'react';
import PropTypes from 'prop-types';
import { Button as GGButton } from 'gg-components/Button';
import nextifyHref from 'client-utils/nextifyHref';
import Link from 'next/link';

const Button = props => {
  const { href, hrefExternal, ...rest } = props;

  const renderNormalLink = !href || hrefExternal;

  const destination = nextifyHref(href);

  if (renderNormalLink) {
    return <GGButton href={href} hrefExternal={hrefExternal} {...rest} />;
  }

  return (
    <Link passHref href={destination.url} as={destination.as}>
      <GGButton {...rest} />
    </Link>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  hrefExternal: PropTypes.bool,
};

Button.defaultProps = {
  href: null,
  hrefExternal: false,
};

export default Button;
