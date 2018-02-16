import React from 'react';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import netNeutrality from '../Articles/images/netNeutrality.jpg';
import netNeutralitySm from '../Articles/images/netNeutralitySm.jpg';
import vim from '../Articles/images/vim.jpg';
import vimSm from '../Articles/images/vimSm.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Articles = () => (
  <div>
    <PageSwitchScroller />
    <ArticleCard
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
