import React from 'react';
import Button from '../../components/Button';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import PersonalDetails from '../../components/PersonalDetails';
import PageContentContainer from '../../components/PageContentContainer';
import astonMartin from '../../images/drivingExperience1.jpg';
import CalculationHelpers from './CalculationHelpers';
import georgegillams from '../../images/georgegillams.jpg';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

import STYLES from './home-page-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBanner = props => {
  const { percentageComplete } = props;
  const disclaimerOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    13,
    0,
    1,
  );
  // const descLength = CalculationHelpers.calculateValue(
  //   percentageComplete,
  //   25,
  //   40,
  //   29,
  //   29 + 4 + 10,
  // );
  const namePosition = CalculationHelpers.calculateValue(
    percentageComplete,
    17,
    30,
    5,
    0,
  );
  const nameOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    15,
    25,
    1,
    0,
  );
  const heyMessageMarginLeft = CalculationHelpers.calculateValue(
    percentageComplete,
    35,
    70,
    150,
    0,
  );
  const heyMessageOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    50,
    70,
    0,
    1,
  );
  const profilePicMarginTop = CalculationHelpers.calculateValue(
    percentageComplete,
    35,
    70,
    150,
    20,
  );
  const blueBackgroundOpactity = CalculationHelpers.calculateValue(
    percentageComplete,
    35,
    80,
    0,
    1,
  );
  const lineOffset = CalculationHelpers.calculateValue(
    percentageComplete,
    80,
    100,
    0,
    50,
  );
  // const backgroundImagePosition = CalculationHelpers.calculateValue(
  //   percentageComplete,
  //   0,
  //   10,
  //   -2,
  //   -1,
  // );
  return (
    <div
      className={`${getClassName(
        'home-page-banner__banner-container',
      )} ${getClassName(
        'home-page-banner__banner-container--centered',
      )} ${getClassName('home-page-banner__banner-image')}`}
      style={{
        backgroundColor: '#1E1E1E',
        backgroundImage: `url(${astonMartin})`,
        // backgroundPositionY: `${backgroundImagePosition}rem`,
      }}
    >
      <Section
        style={{
          position: 'absolute',
          top: `${namePosition}rem`,
          opacity: nameOpacity,
        }}
        light
        name="George Gillams"
      >
        <SubSection noAnchor light name="Open-source Software Engineer" />
      </Section>
      {/* <SubSection
        style={{
          position: 'absolute',
          marginTop: '7.6rem',
        }}
        noAnchor
        light
        name={'Open-source Software Engineer at Skyscanner'.substring(
          0,
          descLength,
        )}
      /> */}
      <SubSection
        noAnchor
        light
        style={{
          // marginTop: `${5 - namePosition}rem`,
          opacity: disclaimerOpacity,
          width: 'auto',
          textAlign: 'right',
          paddingRight: '1rem',
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      >
        I wish this were my Aston Martin{' '}
      </SubSection>

      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#44aeff',
          opacity: blueBackgroundOpactity,
        }}
      />
      <Section
        style={{
          position: 'absolute',
          top: '10vh',
          left: `${heyMessageMarginLeft}vh`,
          opacity: heyMessageOpacity,
        }}
        light
        name="Hey! I'm George"
      />
      {/* <hr
        style={{
          border: 0,
          backgroundColor: 'black',
          width: '3px',
          position: 'absolute',
          top: '50vh',
          left: `50vw`,
          height: `${lineOffset}vh`,
        }}
      /> */}
      <div
        style={{
          width: '14rem',
          height: '14rem',
          left: 'calc(50% - 7rem)',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          top: `${profilePicMarginTop}vh`,
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src={georgegillams}
        />
      </div>
      {/* <SubSection noAnchor light name="Software engineer at Skyscanner" /> */}
    </div>
  );
};

export default PersonalDetailsBanner;
