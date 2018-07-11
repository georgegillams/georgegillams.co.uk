import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import { cssModules } from 'bpk-react-utils';
import Button from './Button';

import STYLES from './navigation-bar.scss';

const getClassName = cssModules(STYLES);

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    // Must show at start in case on desktop
    this.state = { isOpen: false, show: true };
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  close = () => {
    this.setState({ isOpen: false });
    setTimeout(() => {
      this.setState({ show: false });
    }, 1000);
  };

  open = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 100);
  };

  render() {
    const { className, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('navigation-bar__container')];
    const navBarClassNameFinal = [getClassName('navigation-bar__bar')];
    const animatedContainerClassNameFinal = [
      getClassName('navigation-bar__animated-container'),
    ];
    if (this.state.isOpen) {
      animatedContainerClassNameFinal.push(
        getClassName('navigation-bar__animated-container--open'),
      );
      navBarClassNameFinal.push(getClassName('navigation-bar__bar--open'));
    }
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <BpkBreakpoint query={BREAKPOINTS.TABLET}>
        {isTablet => (
          <div className={outerClassNameFinal.join(' ')} {...rest}>
            <div className={getClassName('navigation-bar__burger-button')}>
              <Button bouncy onClick={this.toggle}>
                {this.state.isOpen ? (
                  <BpkIconClose style={{ paddingTop: '.3rem' }} />
                ) : (
                  <BpkIconMenu style={{ paddingTop: '.3rem' }} />
                )}
              </Button>
            </div>
            {(this.state.show || !isTablet) && (
              <div
                className={animatedContainerClassNameFinal.join(' ')}
                {...rest}
                onClick={this.close}
              >
                <header className={navBarClassNameFinal.join(' ')} {...rest}>
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="BLOG"
                    linkUrl="/blog"
                  />
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="TRAVEL"
                    linkUrl="/travel"
                  />
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="PHOTOGRAPHY"
                    linkUrl="/photography"
                  />
                  <Logo
                    className={getClassName('navigation-bar__nav-item')}
                    small
                    animated
                  />
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="WORK"
                    linkUrl="/work"
                  />
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="ABOUT"
                    linkUrl="/about"
                  />
                  <NavigationItem
                    className={getClassName('navigation-bar__nav-item')}
                    name="GET IN TOUCH"
                    linkUrl="/contact"
                  />
                </header>
              </div>
            )}
          </div>
        )}
      </BpkBreakpoint>
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
