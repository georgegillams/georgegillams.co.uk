import React from 'react';
import {
  Route,
} from 'react-router-dom';
import ProfilePic from './ProfilePic';
import ComingSoon from './ComingSoon';
import PersonalDetails from './PersonalDetails';
import Navigation from './Navigation';
import Stuff from './Stuff';
import Contact from './Contact';

import STYLES from './nav-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const NavLayout = () => (
  <div className={getClassName('nav-layout__main')}>
    <div className={getClassName('nav-layout__centre-column')}>
      <span className={getClassName('nav-layout__nav-col')}>
        <ProfilePic />
        <PersonalDetails />
        <Navigation />
      </span>
      <span className={getClassName('nav-layout__content-col')}>
        <Route exact path="/" component={ComingSoon} />
        <Route path="/stuff" component={Stuff} />
        <Route path="/contact" component={Contact} />
      </span>
    </div>
  </div>
);

export default NavLayout;
