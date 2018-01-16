import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';

import STYLES from './footer.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

const mainLinkStyle = { color: '#3e9eeb', fontFamily: 'Neuton', fontWeight: 'bold' };
const linkStyle = { color: colorGray700, fontFamily: 'Neuton' };

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

  // <SubSection clasName={getClassName('navigation-bar__item')} name="TEST" />
    render() {
      const { className, ...rest } = this.props;
      const outerClassNameFinal = [getClassName('navigation-bar__bar')];
      if (className) { outerClassNameFinal(className); }

      return (
        <footer className={outerClassNameFinal.join(' ')} {...rest}>
          <SubSection fancy noPadding name="© copyright George Gillams 2017 - 2018" />
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
