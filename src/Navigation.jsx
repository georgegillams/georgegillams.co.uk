import React from 'react';

import STYLES from './navigation.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Navigation = () => (
  <div className={getClassName('navigation__container')}>
    <a className={getClassName('navigation__link')} href="/">Home</a>
    <a className={getClassName('navigation__link')} href="/contact">Contact</a>
  </div>
);

export default Navigation;
