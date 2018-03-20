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
        flexWrap: 'wrap',
        marginTop: '3rem',
        justifyContent: 'space-between',
        width: 'calc(100% + 4rem)',
        marginLeft: '-2rem',
      }}
    >
      <div style={{ padding: '2rem', flex: 1, minWidth: '13rem' }}>
        <ArticleCard
          day={null}
          month={null}
          className={getClassName('pages__card')}
          imageSrc={blogIcon}
          linkUrl="/blog"
          title="Blog"
          tallLayout
        />
      </div>
      <div style={{ padding: '2rem', flex: 1, minWidth: '13rem' }}>
        <ArticleCard
          day={null}
          month={null}
          className={getClassName('pages__card')}
          imageSrc={photographyIcon}
          linkUrl="/photography"
          title="Photos"
          tallLayout
        />
      </div>
      <div style={{ padding: '2rem', flex: 1, minWidth: '13rem' }}>
        <ArticleCard
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
// <Showcase name="Articles">
//   <Card name="Net neutrality" linkUrl="/blog/net-neutrality" />
//   <Card name="Vim" linkUrl="/blog/vim" />
// </Showcase >

export default HomePageV2;
