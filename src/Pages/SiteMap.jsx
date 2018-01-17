import React from 'react';
import TextLink from '../components/TextLink';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const SiteMap = () => (
  <div className={getClassName('pages__site-map-tree')}>
    <div>
      <SubSection className={getClassName('pages__site-map-item')} name="Articles 📝">
        <TextLink href="/articles/vim">Switching to Vim</TextLink>
        <br />
        <TextLink href="/articles/net-neutrality">My Take on Net Neutrality</TextLink>
      </SubSection>
      <SubSection className={getClassName('pages__site-map-item')} name="Travel ✈️">
        <TextLink href="/travel/iceland-2018"> Iceland </TextLink>
        <br />
        <TextLink href="/travel/longleat-2017"> Longleat </TextLink>
        <br />
        <TextLink href="/travel/munich-2017"> Munich </TextLink>
      </SubSection>
      {/* <SubSection className={getClassName('pages__site-map-item')} name="Documents 🥇">
        <TextLink  href="/documents/degree">
         <SubSection nclassName={getClassName('pages__site-map-item')}oPadding link name="Degree Certificate - 2018
        </TextLink>
        <br />
      </SubSection> */}
      <SubSection className={getClassName('pages__site-map-item')} name="Other stuff 🤷‍♂️">
        <TextLink href="/about"> About me </TextLink>
        <br />
        <TextLink href="/contact"> Contact </TextLink>
      </SubSection>
    </div>
  </div>
);

export default SiteMap;
