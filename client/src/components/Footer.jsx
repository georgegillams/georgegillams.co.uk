import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
import TechSpecs from './TechSpecs';
import GetSocial from './GetSocial';
import Logo from './Logo';
import blackPaper from '../images/blackPaper.jpg';

import STYLES from './footer.scss';
import PAGE_STYLES from '../Pages/pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const getClassNamePages = className => PAGE_STYLES[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentYear = new Date().getFullYear();

    const { className, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('footer__container')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <footer
        className={outerClassNameFinal.join(' ')}
        style={{ backgroundImage: `url(${blackPaper})` }}
        {...rest}
      >
        <GetSocial light alwaysCentered className={getClassName('footer__social')} />
        <Logo small alwaysCentered className={getClassName('footer__logo')} noPadding />
        <TechSpecs className={getClassName('footer__tech')} light />
        <SubSection
          noAnchor
          className={getClassName('footer__copyright')}
          fancy
          noPadding
          light
        >{`© copyright George Gillams 2017 - ${currentYear}`}
        </SubSection>
      </footer>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
