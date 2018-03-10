import React from 'react';
import Button from '../../components/Button';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import PersonalDetails from '../../components/PersonalDetails';
import PageContentContainer from '../../components/PageContentContainer';
import astonMartin from '../../images/drivingExperience1.jpg';
import CalculationHelpers from './CalculationHelpers';
import southamptonCitySkyline from '../../images/southamptonCitySkyline.svg';
import londonCitySkyline from '../../images/londonCitySkyline.svg';
import train from '../../images/train.svg';
import house from '../../images/house.svg';
import plane from '../../images/plane.svg';
import cloud1 from '../../images/cloud1.svg';
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

const LiveInSouthamptonBanner = props => {
  const { percentageComplete } = props;

  const liveInTextPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    10,
    1,
    1,
  );
  const liveInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    65,
    1,
    0.5,
  );
  const cityscapeBottomPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    10,
    -50,
    0,
  );
  const cityscapeLeftPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    20,
    60,
    0,
    -150,
  );
  const workInTextOffset = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    60,
    6,
    2,
  );

  const workInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    60,
    0,
    1,
  );

  const planeBottom = CalculationHelpers.calculateValue(
    percentageComplete,
    55,
    100,
    35,
    50,
  );

  const planeLeft = CalculationHelpers.calculateValue(
    percentageComplete,
    55,
    100,
    -5,
    15,
  );
  const trainPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    15,
    70,
    -100,
    150,
  );
  const darkPurpleScreenOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    65,
    100,
    0,
    1,
  );

  return (
    <div
      className={`${getClassName(
        'home-page-banner__banner-container',
      )} ${getClassName('home-page-banner__banner-container--centered')}`}
      style={{
        backgroundColor: '#1E1E1E',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#44aeff',
          opacity: 1,
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
          bottom: `${60 + 0.5 * cityscapeBottomPosition}vh`,
          left: `20vw`,
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
          bottom: `${50 + 0.5 * cityscapeBottomPosition}vh`,
          left: `60vw`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={cloud3} />
      </div>
      <div
        style={{
          width: '5rem',
          position: 'absolute',
          bottom: `${planeBottom}vh`,
          left: `${planeLeft}rem`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={plane} />
      </div>
      <SubSection
        noAnchor
        style={{
          position: 'absolute',
          top: '15vh',
          opacity: liveInTextOpacity,
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
    </div>
  );
};

export default LiveInSouthamptonBanner;
