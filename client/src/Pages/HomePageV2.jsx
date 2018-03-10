import React from 'react';
import Slider from 'react-slick';
import SubSection from '../components/SubSection';
import GetSocial from '../components/GetSocial';
import Card from '../components/Card';
import Showcase from '../components/Showcase';
import PersonalDetailsBanner from './HomePageV2Banners/PersonalDetailsBanner';
import IcelandBanner from './HomePageV2Banners/IcelandBanner';
import NetNeutralityBanner from './HomePageV2Banners/NetNeutralityBanner';
import MunichBanner from './HomePageV2Banners/MunichBanner';
import PasswordCharacterExtractorBanner from './HomePageV2Banners/PasswordCharacterExtractorBanner';
import ArtBanner from './HomePageV2Banners/ArtBanner';
import LiveInSouthamptonBanner from './HomePageV2Banners/LiveInSouthamptonBanner';
import downArrow from '../images/downArrow.png';
import homePageBanner from './HomePageV2Banners/homePageBanner';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBannerH = homePageBanner(
  PersonalDetailsBanner,
  null,
  '01',
);
const SouthamptonBannerH = homePageBanner(LiveInSouthamptonBanner, null, '02');

// TODO ADD DOWN ARROW TO PERSONAL BANNER
// TODO PASS IN PROP TO SAY WHAT PERCENTAGE OF SCROLLING IS DONE
// TODO MAKE HEIGHT 100vh FOR ALL BANNERS, except THE FIRST WHICH SHOULD BE calc(100vh - navbar height)
const HomePageV2 = () => (
  <main>
    <div className={getClassName('pages__slider')}>
      <PersonalDetailsBannerH />
      <SouthamptonBannerH />
      <img
        src={downArrow}
        style={{
          position: 'absolute',
          left: 'calc(50% - 1.5rem)',
          bottom: '1rem',
          width: '3rem',
          // opacity: arrowOpacity,
        }}
      />
      {/* <LiveInSouthamptonBanner />
      <WorkInLondonBanner />
      <OpenSourceSoftwareEngineerAtSkyscannerBanner />
      <PassionateAboutPhotographyBanner /> */}
    </div>
    <div>
      {/* <BlogCard />
      <PhotographyCard />
      <ContactCard /> */}
    </div>
  </main>
);
// <Showcase name="Articles">
//   <Card name="Net neutrality" linkUrl="/blog/net-neutrality" />
//   <Card name="Vim" linkUrl="/blog/vim" />
// </Showcase >

export default HomePageV2;
