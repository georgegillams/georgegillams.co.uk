import React from 'react';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import astonMartin from '../../images/drivingExperience1.jpg';
import CalculationHelpers from './CalculationHelpers';
import georgegillams from '../../images/georgegillams.jpg';
import southamptonCitySkyline from '../../images/southamptonCitySkyline.svg';
import londonCitySkyline from '../../images/londonCitySkyline.svg';
import train from '../../images/train.svg';
import house from '../../images/house.svg';
import plane from '../../images/plane.svg';
import cloud2 from '../../images/cloud2.svg';
import cloud3 from '../../images/cloud3.svg';
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
    3.25,
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
    4.25,
    7.5,
    5,
    0,
  );
  const nameOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    3.75,
    6.25,
    1,
    0,
  );
  const heyMessageMarginLeft = CalculationHelpers.calculateValue(
    percentageComplete,
    8.75,
    17.5,
    150,
    0,
  );
  const heyMessageOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    12.5,
    17.5,
    0,
    1,
  );
  const profilePicMarginTop = CalculationHelpers.calculateValue(
    percentageComplete,
    8.75,
    17.5,
    150,
    20,
  );
  const blueBackgroundOpactity = CalculationHelpers.calculateValue(
    percentageComplete,
    8.75,
    20,
    0,
    1,
  );
  const liveInTextPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    1,
    1,
  );
  const liveInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    0,
    1,
  );
  const liveInTextOpacity2 = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    43.75,
    1,
    0.5,
  );
  const cityscapeBottomPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    -50,
    0,
  );
  const cloudBottomPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    -50,
    60,
  );
  const blueBackgroundOpactity2 = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    0,
    1,
  );
  const cityscapeLeftPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    42.5,
    46.25,
    0,
    -150,
  );
  const workInTextOffset = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    46.25,
    6,
    2,
  );

  const workInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    42.5,
    45,
    0,
    1,
  );

  const planeBottom = CalculationHelpers.calculateValue(
    percentageComplete,
    38.75,
    50,
    35,
    50,
  );

  const planeLeft = CalculationHelpers.calculateValue(
    percentageComplete,
    38.75,
    50,
    -5,
    15,
  );
  const trainPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    42.5,
    46.25,
    -100,
    150,
  );
  const darkPurpleScreenOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    55,
    60,
    0,
    1,
  );
  const cloud2Left = CalculationHelpers.calculateValue(
    percentageComplete,
    57.5,
    60,
    20,
    -50,
  );
  const cloud3Left = CalculationHelpers.calculateValue(
    percentageComplete,
    57.5,
    60,
    60,
    -50,
  );
  const planeLeft2 = CalculationHelpers.calculateValue(
    percentageComplete,
    57.5,
    60,
    0,
    -100,
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

      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#44aeff',
          opacity: blueBackgroundOpactity2,
        }}
      />
      <div
        style={{
          width: '200vw',
          height: '14rem',
          position: 'absolute',
          bottom: 0,
          left: `${40 + cityscapeLeftPosition}vw`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100vw',
            position: 'absolute',
            bottom: `${cityscapeBottomPosition}vh`,
            left: `${trainPosition}vw`,
          }}
        >
          <img style={{ width: '100%' }} altText="George Gillams" src={train} />
        </div>
      </div>
      <div
        style={{
          width: '50vw',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          bottom: `${cityscapeBottomPosition}vh`,
          left: `${cityscapeLeftPosition}vw`,
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src={southamptonCitySkyline}
        />
      </div>
      <div
        style={{
          width: '100vw',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          bottom: `${cityscapeBottomPosition}vh`,
          left: `${150 + cityscapeLeftPosition}vw`,
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src={londonCitySkyline}
        />
      </div>
      <div
        style={{
          width: '35vw',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          bottom: `${cityscapeBottomPosition}vh`,
          left: `${40 + cityscapeLeftPosition}vw`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={house} />
      </div>
      <SubSection
        noAnchor
        style={{
          position: 'absolute',
          top: '15vh',
          opacity: liveInTextOpacity * liveInTextOpacity2,
        }}
        light
        name="I live in Southampton with my beautiful fiancée and cat"
      />
      <SubSection
        noAnchor
        style={{
          position: 'absolute',
          top: `calc(15vh + ${workInTextOffset}rem)`,
          opacity: workInTextOpacity,
        }}
        light
        name="and work for Skyscanner in London"
      />
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#7B5BDF',
          opacity: darkPurpleScreenOpacity,
        }}
      />
      <div
        style={{
          width: '5rem',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          bottom: `${cloudBottomPosition}vh`,
          left: `20vw`,
          left: `${cloud2Left}vw`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={cloud2} />
      </div>
      <div
        style={{
          width: '5rem',
          position: 'absolute',
          borderRadius: '.5rem',
          overflow: 'hidden',
          bottom: `${cloudBottomPosition - 10}vh`,
          left: `60vw`,
          left: `${cloud3Left}vw`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={cloud3} />
      </div>
      <div
        style={{
          width: '5rem',
          position: 'absolute',
          bottom: `${planeBottom}vh`,
          left: `calc(${planeLeft}rem + ${planeLeft2}vw)`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={plane} />
      </div>
    </div>
  );
};

export default PersonalDetailsBanner;
