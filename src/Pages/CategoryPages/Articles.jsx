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
        <SubSection className={getClassName('pages__site-map-item')} name="Articles 📝">
          <a className={getClassName('pages__link')} href="/articles/vim">
          Switching to Vim
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/articles/net-neutrality">
          My Take on Net Neutrality
          </a>
        </SubSection>
      </div>
    </div>
  </SideBar>
);

export default SiteMap;
