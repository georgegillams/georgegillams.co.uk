import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const HomePage = () => (
  <main className={getClassName('pages__home-page-tree')}>
    <div>
      <SubSection className={getClassName('pages__home-page-item')} name="Articles">
        <a className={getClassName('pages__link')} href="/vim">
Switching to Vim
        </a>
        <br />
        <a className={getClassName('pages__link')} href="/net-neutrality">
       My Take on Net Neutrality
        </a>
      </SubSection>
      <SubSection className={getClassName('pages__home-page-item')} name="Travel">
        <a className={getClassName('pages__link')} href="/Iceland">
Iceland
        </a>
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
