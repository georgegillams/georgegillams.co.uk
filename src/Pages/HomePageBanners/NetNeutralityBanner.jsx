import React from 'react';
import NoSideBar from '../../components/NoSideBar';
import Section from './../../components/Section';
import netNeutrality from '../Articles/images/netNeutrality.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const NetNeutralityBanner = () => (
  <main className={getClassName('pages__banner')}>
    <div className={getClassName('pages__banner-image')} style={{ backgroundImage: `url(${netNeutrality})` }} >
      <NoSideBar>
        <div className={getClassName('pages__banner-container')}>
          <a className={getClassName('pages__link')} href="/articles/net-neutrality">
            <Section name="My Take on Net Neutrality" textClassName={getClassName('pages__link')} />
          </a>
        </div>
      </NoSideBar>
    </div>
  </main>
);

export default NetNeutralityBanner;
