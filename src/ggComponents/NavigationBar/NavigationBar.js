import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { BurgerButton } from '../BurgerButton';
import { cssModules } from '../helpers/cssModules';

import STYLES from './navigation-bar.module.scss';

const getClassName = cssModules({ ...STYLES });

const NavigationBar = props => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [changing, setChanging] = useState(false);

  const closeMenu = () => {
    setChanging(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      setChanging(false);
    }, 500);
  };

  const openMenu = () => {
    setChanging(true);
    setShow(true);
    setTimeout(() => {
      setOpen(true);
      setChanging(false);
    }, 100);
  };

  useEffect(() => {
    const escEventListener = event => {
      if (event.isComposing || event.keyCode === 27) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', escEventListener);

    const cleanUp = () => {
      document.removeEventListener('keydown', escEventListener);
    };
    return cleanUp;
  }, []);

  const toggleMenu = () => {
    if (changing) {
      return;
    }
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const { className, menuItems, logo, accountMenuItem, ...rest } = props;
  const outerClassNameFinal = [getClassName('navigation-bar__container')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  const animatedContainerClassNameFinal = [getClassName('navigation-bar__animated-container')];
  const scrimClassNames = [getClassName('navigation-bar__scrim')];
  const burgerClassNames = [getClassName('navigation-bar__burger-button')];
  if (open) {
    animatedContainerClassNameFinal.push(getClassName('navigation-bar__animated-container--open'));
    scrimClassNames.push(getClassName('navigation-bar__scrim--open'));
  }

  const menuItemsWithClickBehaviour =
    menuItems &&
    menuItems.map(menuItem =>
      menuItem
        ? React.cloneElement(menuItem, {
            onClick: closeMenu,
            className: getClassName('navigation-bar__sidebar-menu-item'),
          })
        : null
    );

  return (
    <header role="banner">
      {show && <div aria-hidden="true" className={scrimClassNames.join(' ')} onClick={closeMenu} />}

      {show && (
        <div aria-hidden={show ? null : 'true'} className={animatedContainerClassNameFinal.join(' ')}>
          <nav className={getClassName('navigation-bar__mobile-menu-container')}>{menuItemsWithClickBehaviour}</nav>
        </div>
      )}
      <div className={getClassName('navigation-bar__bar-placeholder')} />
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <div className={getClassName('navigation-bar__bar')} {...rest}>
          <div className={getClassName('navigation-bar__mobile-container', 'navigation-bar__mobile-container--left')}>
            <BurgerButton
              className={burgerClassNames.join(' ')}
              lineClassName={getClassName('navigation-bar__burger-button__line')}
              isOpen={open}
              aria-label="Menu"
              onClick={toggleMenu}
            />
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className={getClassName('navigation-bar__logo-container')} onClick={closeMenu}>
            {logo}
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={getClassName('navigation-bar__mobile-container', 'navigation-bar__mobile-container--rgt')}
            onClick={closeMenu}>
            {accountMenuItem}
          </div>
        </div>
      </div>
    </header>
  );
};

NavigationBar.propTypes = {
  accountMenuItem: PropTypes.node,
  className: PropTypes.string,
  logo: PropTypes.node,
  menuItems: PropTypes.arrayOf(PropTypes.node),
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

NavigationBar.defaultProps = {
  accountMenuItem: null,
  className: null,
  logo: null,
  menuItems: null,
  user: null,
};

export default NavigationBar;
