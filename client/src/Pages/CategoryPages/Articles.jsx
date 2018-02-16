import React from 'react';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import netNeutrality from '../Articles/images/spinner.gif';
import netNeutralitySm from '../Articles/images/netNeutralitySm.jpg';
import vim from '../Articles/images/vim.jpg';
import vimSm from '../Articles/images/vimSm.png';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Articles = () => (
  <div>
    <PageSwitchScroller />
    <ArticleCard
      backgroundImageClassName={getClassName('pages__nn-background-image')}
      imageBorder="red"
      day={8}
      month="Dec"
      className={getClassName('pages__card')}
      fillImageSrc={netNeutrality}
      imageSrc={netNeutralitySm}
      linkUrl="/articles/net-neutrality"
      title="My Take on Net Neutrality"
    />
    <ArticleCard
      light
      day={23}
      imageBorder="lightgray"
      month="Dec"
      className={getClassName('pages__card')}
      fillImageSrc={vim}
      imageSrc={vimSm}
      linkUrl="/articles/vim"
      title="Switching to Vim"
    />
  </div>
);

export default Articles;
