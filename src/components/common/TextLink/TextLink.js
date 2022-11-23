import React from 'react';
import PropTypes from 'prop-types';
import GGTextLink, { applyStylesToAnchor } from '@george-gillams/components/text-link';
import Link from 'next/link';

const anchorComponent = applyStylesToAnchor(Link);
const TextLink = props => {
  const { hrefExternal, ...rest } = props;
  if (hrefExternal) {
    return <GGTextLink {...props} />;
  }

  return <GGTextLink anchorComponent={anchorComponent} {...rest} />;
};

TextLink.propTypes = {
  hrefExternal: PropTypes.bool,
};
TextLink.defaultProps = {
  hrefExternal: false,
};

export default TextLink;
