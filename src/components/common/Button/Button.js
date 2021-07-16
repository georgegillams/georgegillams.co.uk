import React from 'react';
import PropTypes from 'prop-types';
import { Button as GGButton } from '@george-gillams/components/Button';
import nextifyHref from '@george-gillams/webapp/utils/nextifyHref';
import Link from 'next/link';

const Button = props => {
  const { href, hrefExternal, ...rest } = props;

  const renderNormalButton = !href || hrefExternal;

  const destination = nextifyHref(href);

  if (renderNormalButton) {
    return <GGButton href={href} hrefExternal={hrefExternal} {...rest} />;
  }

  return (
    <Link passHref href={destination.url} as={destination.as} {...destination.options}>
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
