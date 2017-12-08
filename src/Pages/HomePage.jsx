import React from 'react';
import Section from '../components/Section';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const HomePage = () => (
  <main>
    <a className={getClassName('pages__link')} href="/net-neutrality">
      <Section name="My Take on Net Neutrality">
        In the US right now the FCC are getting ready for a vote to end Net-Neutrality, but many (myself included) believe that Ajit Pai is coordinating this brutal attack on the Internet just to line the pockets of his friends at Comcast, AT&amp;T and Verizon.
      </Section>
    </a>

  </main>
);

export default HomePage;
