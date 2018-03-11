import React from 'react';
import PersonalDetailsBanner from './HomePageV2Banners/PersonalDetailsBanner';
import homePageBanner from './HomePageV2Banners/homePageBanner';
import ArticleCard from '../components/ArticleCard';
import phoneIcon from '../icons/phoneIcon.png';
import blogIcon from './../icons/blogIcon.jpg';
import photographyIcon from './../icons/photoIcon.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetailsBannerH = homePageBanner(
  PersonalDetailsBanner,
  '1200vh',
  '01',
);

const HomePageV2 = () => (
  <main>
    <div className={getClassName('pages__slider')}>
      <PersonalDetailsBannerH />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '3rem',
        justifyContent: 'space-around',
        width: '100vw',
      }}
    >
      <ArticleCard
        day={null}
        month={null}
        className={getClassName('pages__card')}
        imageSrc={blogIcon}
        linkUrl="/blog"
        title="Blog"
        style={{ maxWidth: '26%' }}
        fixedWidth
      />
      <ArticleCard
        day={null}
        month={null}
        className={getClassName('pages__card')}
        imageSrc={photographyIcon}
        linkUrl="/photography"
        title="Photos"
        style={{ maxWidth: '26%' }}
        fixedWidth
      />
      <ArticleCard
        day={null}
        month={null}
        className={getClassName('pages__card')}
        imageSrc={phoneIcon}
        linkUrl="/contact"
        title="Contact"
        style={{ maxWidth: '26%' }}
        fixedWidth
      />
    </div>
  </main>
);
// <Showcase name="Articles">
//   <Card name="Net neutrality" linkUrl="/blog/net-neutrality" />
//   <Card name="Vim" linkUrl="/blog/vim" />
// </Showcase >

export default HomePageV2;
