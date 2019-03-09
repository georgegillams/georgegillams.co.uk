import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from 'components/Logo';
import TechSpecs from './TechSpecs';

import './footer.scss';

const Footer = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = ['footer__container'];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <Logo small alwaysCentered className="footer__logo" noPadding />
      <TechSpecs className="footer__tech" light />
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
