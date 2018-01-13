import React from 'react';
import SideBar from '../../components/SideBar';
import SubSection from '../../components/SubSection';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const SiteMap = () => (
  <SideBar>
    <div className={getClassName('pages__site-map-tree')}>
      <div>
        <SubSection className={getClassName('pages__site-map-item')} name="Travel ✈️">
          {/* <a className={getClassName('pages__link')} href="https://flic.kr/s/aHsm9VxHMV"> */}
          <a className={getClassName('pages__link')} href="/travel/iceland-2018">
          Iceland
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/travel/longleat-2017">
          Longleat
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/travel/munich-2017">
          Munich
          </a>
        </SubSection>
      </div>
    </div>
  </SideBar>
);

export default SiteMap;
