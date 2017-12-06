import React from 'react';
import ProfilePic from './ProfilePic';
import ComingSoon from './ComingSoon';

import STYLES from './nav-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NavLayout = () => (
  <div className={getClassName('nav-layout__main')}>
    <div className={getClassName('nav-layout__centre-column')}>
      <span className={getClassName('nav-layout__nav-col')}>
        <ProfilePic />
      </span>
      <span className={getClassName('nav-layout__content-col')}>
        <ComingSoon />
      </span>
    </div>
  </div>
);

export default NavLayout;
