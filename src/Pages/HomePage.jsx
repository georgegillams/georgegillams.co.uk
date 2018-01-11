import React from 'react';
import Slider from 'react-slick';
import SubSection from '../components/SubSection';
import GetSocial from '../components/GetSocial';
import PersonalDetailsBanner from './HomePageBanners/PersonalDetailsBanner';
import IcelandBanner from './HomePageBanners/IcelandBanner';
import NetNeutralityBanner from './HomePageBanners/NetNeutralityBanner';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const HomePage = () => (
  <main>
    <Slider
      dots
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay
      autoplaySpeed={10000}
    >
      <div><PersonalDetailsBanner /></div>
      <div><IcelandBanner /></div>
      <div><NetNeutralityBanner /></div>
    </Slider>
    <br />
    <br />
    <div className={getClassName('pages__home-page-gubbins')}>
      <GetSocial alwaysCentered />
      <a className={getClassName('pages__link')} href="/site-map" >
        <SubSection name="Site map →" textClassName={getClassName('pages__link')} />
      </a>
    </div>
  </main>
);

export default HomePage;
