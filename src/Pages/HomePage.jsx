import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const HomePage = () => (
  <main className={getClassName('pages__home-page-tree')}>
    <div>
      <SubSection className={getClassName('pages__home-page-item')} name="Articles 📝">
        <a className={getClassName('pages__link')} href="/articles/vim">
          Switching to Vim
        </a>
        <br />
        <a className={getClassName('pages__link')} href="/articles/net-neutrality">
          My Take on Net Neutrality
        </a>
      </SubSection>
      <SubSection className={getClassName('pages__home-page-item')} name="Travel ✈️">
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
      <SubSection className={getClassName('pages__home-page-item')} name="Other stuff 🤷‍♂️">
        <a className={getClassName('pages__link')} href="/about">
          About me
        </a>
        <br />
        <a className={getClassName('pages__link')} href="/contact">
          Contact
        </a>
        {/*  <a className={getClassName('pages__link')} href="/engagement">
          Engagement
        </a> */}
      </SubSection>
      {/* <a className={getClassName('pages__link')} href="/engagement">
      <Section className={getClassName('pages__home-page-item')} name="We just got engaged!">
        I finally got around to asking, and she said yes!
      </Section>
    </a> */}
    </div>
  </main>
);

export default HomePage;
