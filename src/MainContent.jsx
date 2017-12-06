import React from 'react';
import Section from './Section';
import SubSection from './SubSection';

import STYLES from './main-content.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const MainContent = () => (
  <main className={getClassName('main-content__main')}>
    <Section name="Section name">
      <SubSection name="Subsection name">
            Content
      </SubSection>
    </Section>
  </main>
);

export default MainContent;
