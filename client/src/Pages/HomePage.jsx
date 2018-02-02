import React from 'react';
import Slider from 'react-slick';
import SubSection from '../components/SubSection';
import GetSocial from '../components/GetSocial';
import Card from '../components/Card';
import Showcase from '../components/Showcase';
import PersonalDetailsBanner from './HomePageBanners/PersonalDetailsBanner';
import IcelandBanner from './HomePageBanners/IcelandBanner';
import NetNeutralityBanner from './HomePageBanners/NetNeutralityBanner';
import MunichBanner from './HomePageBanners/MunichBanner';
import PasswordCharacterExtractorBanner from './HomePageBanners/PasswordCharacterExtractorBanner';
import ArtBanner from './HomePageBanners/ArtBanner';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const HomePage = () => (
  <main>
    <Slider
      className={getClassName('pages__slider')}
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay
      autoplaySpeed={10000}
    >
      <div>
        <PersonalDetailsBanner />
      </div>
      <div>
        <IcelandBanner />
      </div>
      <div>
        <NetNeutralityBanner />
      </div>
      {/* <div>
        <BackpackBanner />
      </div>
      <div>
        <MozillaBanner />
      </div> */}
      <div>
        <ArtBanner />
      </div>
      <div>
        <MunichBanner />
      </div>
      <div>
        <PasswordCharacterExtractorBanner />
      </div>
    </Slider>
    <div style={{ minHeight: '15rem' }} />
  </main>
);
// <Showcase name="Articles">
//   <Card name="Net neutrality" linkUrl="/articles/net-neutrality" />
//   <Card name="Vim" linkUrl="/articles/vim" />
// </Showcase >

export default HomePage;
