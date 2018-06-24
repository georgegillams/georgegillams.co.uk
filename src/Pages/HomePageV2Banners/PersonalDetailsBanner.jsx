import React from 'react';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import CalculationHelpers from './CalculationHelpers';
import southamptonCitySkyline from '../../images/southamptonCitySkyline.svg';
import londonCitySkyline from '../../images/londonCitySkyline.svg';
import train from '../../images/train.svg';
import house from '../../images/house.svg';
import plane from '../../images/plane.svg';
import cloud2 from '../../images/cloud2.svg';
import cloud3 from '../../images/cloud3.svg';
import downArrow from '../../images/downArrow.svg';
import STYLES from './home-page-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBanner = props => {
  const { percentageComplete } = props;

  if (isNaN(percentageComplete)) {
    return (
      <div
        className={`${getClassName('home-page-banner__banner-image')}`}
        style={{
          width: '100%',
          height: '75rem',
          backgroundColor: '#1E1E1E',
          backgroundImage: `url(https://i.imgur.com/gIccH4E.jpg)`,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Section
          style={{
            paddingTop: `5rem`,
            textShadow: '.1rem .1rem .2rem #1E1E1E',
          }}
          light
          name="George Gillams"
        >
          <SubSection noAnchor light name="Open-source Software Engineer" />
        </Section>
        <SubSection
          noAnchor
          light
          style={{
            // marginTop: `${5 - namePosition}rem`,
            width: 'auto',
            textAlign: 'right',
            paddingRight: '1rem',
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          Serre Chevalier Ski Resort
        </SubSection>
      </div>
    );
  }

  const downArrowBottom = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    3.25,
    1,
    4,
  );
  const downArrowOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    3.25,
    1,
    0,
  );
  const disclaimerOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    0,
    3.25,
    0,
    1,
  );
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
  const liveInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    27.5,
    30,
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
  const cityscapeBottomOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    23,
    25,
    0,
    1,
  );
  const cityscapeBottomPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    25,
    27.5,
    -100,
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
    37.5,
    46.25,
    0,
    -150,
  );
  const workInTextOffset = CalculationHelpers.calculateValue(
    percentageComplete,
    40,
    46.25,
    6,
    4,
  );

  const workInTextOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    37.5,
    45,
    0,
    1,
  );

  const planeBottom = CalculationHelpers.calculateValue(
    percentageComplete,
    27,
    60,
    35,
    54.5,
  );

  const planeLeft = CalculationHelpers.calculateValue(
    percentageComplete,
    27,
    60,
    -5,
    21,
  );

  const cloudsLeftOffsetGradual = CalculationHelpers.calculateValue(
    percentageComplete,
    27,
    60,
    0,
    -10,
  );
  const trainPosition = CalculationHelpers.calculateValue(
    percentageComplete,
    37.5,
    46.25,
    -100,
    150,
  );
  const photogImageBackgroundOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    55,
    60,
    0,
    1,
  );
  const planeLeft2 = CalculationHelpers.calculateValue(
    percentageComplete,
    57.5,
    60,
    0,
    -120,
  );
  const photogImage1Opacity = CalculationHelpers.calculateValue(
    percentageComplete,
    72,
    75,
    0,
    1,
  );
  const photogImage1Opacity2 = CalculationHelpers.calculateValue(
    percentageComplete,
    79,
    80,
    1,
    0,
  );
  const photogImage2Opacity = CalculationHelpers.calculateValue(
    percentageComplete,
    82,
    85,
    0,
    1,
  );
  const photogImage2Opacity2 = CalculationHelpers.calculateValue(
    percentageComplete,
    89,
    90,
    1,
    0,
  );
  const photogImage3Opacity = CalculationHelpers.calculateValue(
    percentageComplete,
    92,
    95,
    0,
    1,
  );
  const photographyTitleOpacity = CalculationHelpers.calculateValue(
    percentageComplete,
    62,
    65,
    0,
    1,
  );

  return (
    <div
      className={`${getClassName(
        'home-page-banner__banner-container',
      )} ${getClassName(
        'home-page-banner__banner-container--centered',
      )} ${getClassName('home-page-banner__banner-image')}`}
      style={{
        backgroundColor: '#1E1E1E',
        backgroundImage: `url(https://i.imgur.com/gIccH4E.jpg)`,
        // backgroundPositionY: `${backgroundImagePosition}rem`,
      }}
    >
      <Section
        style={{
          position: 'absolute',
          top: `${namePosition}rem`,
          opacity: nameOpacity,
          textShadow: '.1rem .1rem .2rem #1E1E1E',
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
        Serre Chevalier Ski Resort
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
          borderRadius: '.35rem',
          overflow: 'hidden',
          top: `${profilePicMarginTop}vh`,
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src="https://i.imgur.com/sJQ2H3u.png"
        />
      </div>
      <img
        src={downArrow}
        style={{
          position: 'fixed',
          left: 'calc(50% - 1.5rem)',
          bottom: `${downArrowBottom}rem`,
          opacity: `${downArrowOpacity}`,
          width: '3rem',
          // opacity: arrowOpacity,
        }}
      />

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
          borderRadius: '.35rem',
          overflow: 'hidden',
          bottom: `${cityscapeBottomPosition}vh`,
          left: `${cityscapeLeftPosition}vw`,
          opacity: cityscapeBottomOpacity,
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
          borderRadius: '.35rem',
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
          borderRadius: '.35rem',
          overflow: 'hidden',
          bottom: `${cityscapeBottomPosition}vh`,
          left: `${40 + cityscapeLeftPosition}vw`,
          opacity: cityscapeBottomOpacity,
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
        name="I live in Southampton with my wonderful fiancée and cat"
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
          width: '5rem',
          position: 'absolute',
          borderRadius: '.35rem',
          overflow: 'hidden',
          bottom: `${cloudBottomPosition}vh`,
          left: `${20 + cloudsLeftOffsetGradual}vw`,
        }}
      >
        <img style={{ width: '100%' }} altText="George Gillams" src={cloud2} />
      </div>
      <div
        style={{
          width: '5rem',
          position: 'absolute',
          borderRadius: '.35rem',
          overflow: 'hidden',
          bottom: `${cloudBottomPosition - 10}vh`,
          left: `${60 + cloudsLeftOffsetGradual}vw`,
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
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#1E1E1E',
          opacity: photogImageBackgroundOpacity,
        }}
      />

      <SubSection
        noAnchor
        style={{
          position: 'absolute',
          top: '15vh',
          opacity: photographyTitleOpacity,
        }}
        light
        name="... and I love photography"
      />
      <div
        style={{
          width: '60vw',
          position: 'absolute',
          top: `calc(25vh + 3rem)`,
          left: `calc(50vw - 30vw)`,
          opacity: photogImage1Opacity * photogImage1Opacity2,
          borderRadius: '.35rem',
          overflow: 'hidden',
          height: '40vw',
          maxWidth: '40rem',
          maxHeight: '26.5rem',
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src="https://i.imgur.com/8dnCZ5D.jpg"
        />
      </div>
      <div
        style={{
          width: '60vw',
          position: 'absolute',
          top: `calc(25vh + 3rem)`,
          right: `calc(50vw - 30vw)`,
          opacity: photogImage2Opacity * photogImage2Opacity2,
          borderRadius: '.5rem',
          overflow: 'hidden',
          height: '40vw',
          maxWidth: '40rem',
          maxHeight: '26.5rem',
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src="https://i.imgur.com/WlLYxDw.jpg"
        />
      </div>
      <div
        style={{
          width: '60vw',
          position: 'absolute',
          top: `calc(25vh + 3rem)`,
          left: `calc(50vw - 30vw)`,
          opacity: photogImage3Opacity,
          borderRadius: '.5rem',
          overflow: 'hidden',
          height: '40vw',
          maxWidth: '40rem',
          maxHeight: '26.5rem',
        }}
      >
        <img
          style={{ width: '100%' }}
          altText="George Gillams"
          src="https://i.imgur.com/EHF7zqM.jpg"
        />
      </div>
      {/* <span
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          color: 'white',
          fontWeight: 'bold',
          fontSize: '4rem',
        }}
      >
        {percentageComplete}
      </span> */}
    </div>
  );
};

export default PersonalDetailsBanner;
