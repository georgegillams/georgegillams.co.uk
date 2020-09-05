import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FeatureCard as GGFeatureCard, FEATURE_CARD_LAYOUTS } from 'gg-components/FeatureCard';
import HelperFunctions from 'helpers/common/HelperFunctions';
import Router, { useRouter } from 'next/router';
import nextifyHref from 'utils/nextifyHref';

const FeatureCard = props => {
  const { href, onClick, scroll, ...rest } = props;
  const router = useRouter();

  const hrefExternal = href && HelperFunctions.includes(href, 'http');

  const [isServer, setIsServer] = useState(typeof window === 'undefined');

  const renderNormalLink = !href || hrefExternal;

  const destination = nextifyHref(href);

  useEffect(() => {
    setIsServer(false);
    if (!renderNormalLink && process.env.NODE_ENV !== 'test') {
      Router.prefetch(destination.url, destination.as);
    }
  }, []);

  if (isServer || renderNormalLink) {
    return <GGFeatureCard href={href} onClick={onClick} {...rest} />;
  }

  const onClickFinal = async e => {
    if (onClick) {
      onClick(e);
    }
    await router.push(destination.url, destination.as, destination.options);
    if (scroll) {
      return window.scrollTo(0, 0);
    }
    return true;
  };

  return <GGFeatureCard style={{ cursor: 'pointer' }} onClick={onClickFinal} {...rest} />;
};

FeatureCard.propTypes = {
  href: PropTypes.string.isRequired,
  scroll: PropTypes.bool,
  onClick: PropTypes.func,
};

FeatureCard.defaultProps = {
  scroll: true,
  onClick: null,
};

export default FeatureCard;
export { FEATURE_CARD_LAYOUTS };
