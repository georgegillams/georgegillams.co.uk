import React from 'react';
import PersonalDetailsBanner from './HomePageV2Banners/PersonalDetailsBanner';
import homePageBanner from './HomePageV2Banners/homePageBanner';
import ArticleCard, { CARD_LAYOUTS } from '../components/ArticleCard';
import PageSwitchScroller from '../components/PageSwitchScroller';
import phoneIcon from '../icons/phoneIcon.png';
import blogIcon from './../icons/blogIcon.jpg';
import photographyIcon from './../icons/photoIcon.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBannerH = homePageBanner(
  PersonalDetailsBanner,
  1200,
  '01',
  {
    start: 4.8,
    welcome: 24.9,
    life: 38.4,
    work: 46.6,
    'photography - dog': 75.6,
    'photography - motorcyclist': 85.1,
    'photography - light': 95.3,
  },
  false,
);

const HomePageV2 = () => {
  const uA = window.navigator.userAgent;
  const ieOrEdge =
    /msie\s|trident\/|edge\//i.test(uA) &&
    !!(document.uniqueID || window.MSInputMethodContext);

  return (
    <main>
      <PageSwitchScroller />
      {!ieOrEdge && (
        <div className={getClassName('pages__slider')}>
          <PersonalDetailsBannerH />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: '3rem',
          justifyContent: 'space-between',
          width: 'calc(100% + 4rem)',
          marginLeft: '-2rem',
        }}
      >
        <div className={getClassName('pages__compact-card-container')}>
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            imageSrc={blogIcon}
            linkUrl="/blog"
            title="Blog"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            imageSrc={photographyIcon}
            linkUrl="/photography"
            title="Photos"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            imageSrc={phoneIcon}
            linkUrl="/contact"
            title="Contact"
            tallLayout
          />
        </div>
      </div>
    </main>
  );
};
// <Showcase name="Articles">
//   <Card name="Net neutrality" linkUrl="/blog/net-neutrality" />
//   <Card name="Vim" linkUrl="/blog/vim" />
// </Showcase >

export default HomePageV2;
