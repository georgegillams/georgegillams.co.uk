import React from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
import TechSpecs from './TechSpecs';
import GetSocial from './GetSocial';
import Logo from './Logo';
import blackPaper from '../images/blackPaper.jpg';

import STYLES from './footer.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Footer = props => {
  const currentYear = new Date().getFullYear();

  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer className={outerClassNameFinal.join(' ')} {...rest}>
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
