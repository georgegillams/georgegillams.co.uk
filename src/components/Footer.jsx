import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
import TechSpecs from './TechSpecs';
import GetSocial from './GetSocial';
import PersonalDetails from './PersonalDetails';
import blackPaper from '../images/blackPaper.jpg';

import STYLES from './footer.scss';
import PAGE_STYLES from '../Pages/pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const getClassNamePages = className => PAGE_STYLES[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

const mainLinkStyle = { color: '#3e9eeb', fontFamily: 'Neuton', fontWeight: 'bold' };
const linkStyle = { color: colorGray700, fontFamily: 'Neuton' };

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentYear = (new Date()).getFullYear();

    const { className, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('footer__container')];
    if (className) { outerClassNameFinal.push(className); }

    return (
      <footer className={outerClassNameFinal.join(' ')} style={{ backgroundImage: `url(${blackPaper})` }} {...rest}>
        <GetSocial light alwaysCentered className={getClassName('footer__component')} />
        <a href="/site-map" >
          <SubSection noPadding light name="Site map →" link className={getClassName('footer__component')} />
        </a>
        <PersonalDetails light className={getClassName('footer__component')} />
        <TechSpecs light className={getClassName('footer__component')} />
        <SubSection fancy noPadding light >{`© copyright George Gillams 2017 - ${currentYear}`}</SubSection>
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
