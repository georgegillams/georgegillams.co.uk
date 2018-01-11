import React from 'react';
import NoSideBar from '../../components/NoSideBar';
import Section from './../../components/Section';
import iceland from '../Travel/images/iceland0.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const IcelandBanner = () => (
  <main className={getClassName('pages__banner')}>
    <div className={getClassName('pages__banner-image')} style={{ backgroundImage: `url(${iceland})` }} >
      <NoSideBar>
        <div className={getClassName('pages__banner-container')}>
          <a className={getClassName('pages__link')} href="/travel/iceland-2018">
            <Section name="Iceland 2018" textClassName={getClassName('pages__link')} />
          </a>
        </div>
      </NoSideBar>
    </div>
  </main>
);

export default IcelandBanner;
