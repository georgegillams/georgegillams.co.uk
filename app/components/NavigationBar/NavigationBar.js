import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import { Logo } from 'components/Logo';
import { ContentWidthRestrictor } from 'components/Typography';
import GGButton from 'components/GGButton';
import { SmallButtonSkeleton } from 'components/Skeletons';
import NavigationItem from './NavigationItem';

import './navigation-bar.scss';

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
    const {
      className,
      menuItems1,
      menuItems2,
      logo,
      accountMenuItem,
      ...rest
    } = this.props;
    const outerClassNameFinal = ['navigation-bar__container'];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const animatedContainerClassNameFinal = [
      'navigation-bar__animated-container--closed',
    ];
    if (this.state.isOpen) {
      animatedContainerClassNameFinal.push(
        'navigation-bar__animated-container--open',
      );
    }

    const menuItems1WithClickBehaviour =
      menuItems1 &&
      menuItems1.map(menuItem =>
        menuItem
          ? React.cloneElement(menuItem, {
              onClick: this.close,
            })
          : null,
      );

    const menuItems2WithClickBehaviour =
      menuItems2 &&
      menuItems2.map(menuItem =>
        menuItem
          ? React.cloneElement(menuItem, {
              onClick: this.close,
            })
          : null,
      );

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <ContentWidthRestrictor>
          <div className="navigation-bar__bar" {...rest}>
            <div className="navigation-bar__mobile-container--left">
              <GGButton bouncy onClick={this.toggle}>
                {this.state.isOpen ? (
                  <BpkIconClose style={{ height: '1rem' }} />
                ) : (
                  <BpkIconMenu style={{ height: '1rem' }} />
                )}
              </GGButton>
            </div>
            {menuItems1WithClickBehaviour && (
              <div className="navigation-bar__desktop-container">
                {menuItems1WithClickBehaviour}
              </div>
            )}
            <div className="navigation-bar__logo-container">{logo}</div>
            {menuItems2WithClickBehaviour && (
              <div className="navigation-bar__desktop-container">
                {menuItems2WithClickBehaviour}
              </div>
            )}
            <div className="navigation-bar__mobile-container--rgt">
              {accountMenuItem}
            </div>
          </div>
          <div className={animatedContainerClassNameFinal.join(' ')}>
            <div className="navigation-bar__mobile-menu-container">
              {menuItems1WithClickBehaviour}
              {menuItems2WithClickBehaviour}
            </div>
          </div>
        </ContentWidthRestrictor>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string,
};

NavigationBar.defaultProps = {
  user: null,
  className: null,
};

export default NavigationBar;