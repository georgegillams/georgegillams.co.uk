import React from 'react';
import Logo from '../../components/Logo';
import PersonalDetails from '../../components/PersonalDetails';
import NoSideBar from '../../components/NoSideBar';
import blackwood from '../../images/blackwood.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const PersonalDetailsBanner = () => (
  <main className={getClassName('pages__banner')}>
    <div className={getClassName('pages__banner-image')} style={{ background: 'black', backgroundImage: `url(${blackwood})` }} >
      <div>
        <NoSideBar>
          <div className={`${getClassName('pages__banner-container')} ${getClassName('pages__banner-container--vertical-spread')}`}>
            <Logo alwaysCentered light />
            <PersonalDetails centralisedSpread light />
          </div>
        </NoSideBar>
      </div>
    </div>
  </main>
);

export default PersonalDetailsBanner;
