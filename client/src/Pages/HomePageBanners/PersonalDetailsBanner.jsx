import React from 'react';
import Button from '../../components/Button';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import PersonalDetails from '../../components/PersonalDetails';
import PageContentContainer from '../../components/PageContentContainer';
import astonMartin from '../../images/drivingExperience1.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBanner = () => (
  <main className={getClassName('pages__banner')}>
    <div
      className={getClassName('pages__banner-image')}
      style={{
        backgroundColor: 'rgb(60, 68, 81)',
        backgroundImage: `url(${astonMartin})`,
      }}
    >
      <div
        className={`${getClassName('pages__banner-container')} ${getClassName(
          'pages__banner-container--vertical-spread',
        )}`}
      >
        <Section light name="George Gillams">
          <SubSection noAnchor light name="Open-source Software Engineer" />
        </Section>
      </div>
      <SubSection
        light
        style={{
          width: 'auto',
          textAlign: 'right',
          paddingRight: '1rem',
          position: 'relative',
        }}
      >
        I wish this were my Aston Martin{' '}
      </SubSection>
    </div>
  </main>
);

export default PersonalDetailsBanner;
