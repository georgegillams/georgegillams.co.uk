import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const BurgerButtonLink = props => {
  const { href, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest} />
    </Link>
  );
};

BurgerButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default BurgerButtonLink;
