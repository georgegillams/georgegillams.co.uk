import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
import Logo from './Logo';
import NavigationItem from './NavigationItem';

import STYLES from './navigation-bar.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

const mainLinkStyle = { color: '#3e9eeb', fontFamily: 'Neuton', fontWeight: 'bold' };
const linkStyle = { color: colorGray700, fontFamily: 'Neuton' };

class NavigationBar extends Component {
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
        <header className={outerClassNameFinal.join(' ')} {...rest}>
          <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Articles" linkUrl="/articles" />
          <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Travel" linkUrl="/travel" />
          <Logo className={getClassName('navigation-bar__nav-item')} small />
          {/* <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Work" linkUrl="/work" /> */}
          <NavigationItem className={getClassName('navigation-bar__nav-item')} name="About" linkUrl="/about" />
          <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Contact" linkUrl="/contact" />
        </header>
      );
    }
}

NavigationBar.propTypes = {
  className: PropTypes.string,
};

NavigationBar.defaultProps = {
  className: null,
};

export default NavigationBar;
