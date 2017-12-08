import React from 'react';
import Section from './Section';

import STYLES from './for-oh-four.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const ForOhFour = () => (
  <main className={getClassName('for-oh-four__container')}>
    <Section
      className={getClassName('for-oh-four__container')}
      name="Oops."
    >
      The page you&apos;re looking for just isn&apos;t here.
    </Section>
  </main>
);

export default ForOhFour;
