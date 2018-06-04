import React from 'react';
import PropTypes from 'prop-types';
import TechSpecs from './TechSpecs';
import GetSocial from './GetSocial';
import Logo from './Logo';
import TextLink from './TextLink';

import STYLES from './footer.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Footer = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <GetSocial
        light
        alwaysCentered
        className={getClassName('footer__social')}
      />
      <Logo
        small
        alwaysCentered
        className={getClassName('footer__logo')}
        noPadding
      />
      <TextLink
        light
        className={getClassName('footer__site-map')}
        href="/site-map"
      >
        Sitemap
      </TextLink>
      <TechSpecs className={getClassName('footer__tech')} light />
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
