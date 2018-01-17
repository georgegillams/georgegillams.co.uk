import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const SiteMap = () => (
  <div className={getClassName('pages__site-map-tree')}>
    <div>
      <Section className={getClassName('pages__site-map-item')} name="Articles 📝">
        <a href="/articles/vim">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="Switching to Vim" />
        </a>
        <br />
        <a href="/articles/net-neutrality">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="My Take on Net Neutrality" />
        </a>
      </Section>
      <Section className={getClassName('pages__site-map-item')} name="Travel ✈️">
        {/* <a  href="https://flic.kr/s/aHsm9VxHMV"> */}
        <a href="/travel/iceland-2018">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="Iceland" />
        </a>
        <br />
        <a href="/travel/longleat-2017">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="Longleat" />
        </a>
        <br />
        <a href="/travel/munich-2017">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="Munich" />
        </a>
      </Section>
      {/* <Section className={getClassName('pages__site-map-item')} name="Documents 🥇">
        <a  href="/documents/degree">
         <SubSection nclassName={getClassName('pages__site-map-item')}oPadding link name="Degree Certificate - 2018" />
        </a>
        <br />
      </Section> */}
      <Section className={getClassName('pages__site-map-item')} name="Other stuff 🤷‍♂️">
        <a href="/about">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="About me" />
        </a>
        <br />
        <a href="/contact">
          <SubSection className={getClassName('pages__site-map-item')}noPadding link name="Contact" />
        </a>
      </Section>
    </div>
  </div>
);

export default SiteMap;
