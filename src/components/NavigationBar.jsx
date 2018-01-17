import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import Button from './Button';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';

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
      const outerClassNameFinal = [getClassName('navigation-bar__container')];
      const navBarClassNameFinal = [getClassName('navigation-bar__bar')];
      if (this.state.isOpen) { navBarClassNameFinal.push(getClassName('navigation-bar__bar--open')); }
      if (className) { outerClassNameFinal.push(className); }

      return (
        <div className={outerClassNameFinal.join(' ')} {...rest}>
          <div className={getClassName('navigation-bar__burger-button')}>
            <Button bouncy onClick={this.toggle} >
              {this.state.isOpen ? (<BpkIconClose style={{ paddingTop: '.3rem' }} />) : (<BpkIconMenu style={{ paddingTop: '.3rem' }} />)}
            </Button>
          </div>
          <header className={navBarClassNameFinal.join(' ')} {...rest}>
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Articles" linkUrl="/articles" />
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Travel" linkUrl="/travel" />
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Art" linkUrl="/photoshop" />
            <Logo className={getClassName('navigation-bar__nav-item')} small />
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Work" linkUrl="/work" />
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="About" linkUrl="/about" />
            <NavigationItem className={getClassName('navigation-bar__nav-item')} name="Contact" linkUrl="/contact" />
          </header>
        </div>
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
