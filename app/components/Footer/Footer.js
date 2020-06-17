import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';

import { Logo } from '../Logo';

import TechSpecs from './TechSpecs';
import STYLES from './footer.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const Footer = props => {
  const { className, ...rest } = props;
  const outerClassNameFinal = [getClassName('footer__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <footer id="footer" className={outerClassNameFinal.join(' ')} {...rest}>
      <Logo
        small
        alwaysCentered
        className={getClassName('footer__logo')}
        padding={false}
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
