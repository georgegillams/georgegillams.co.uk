import React from 'react';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import netNeutrality from '../Articles/images/spinner.gif';
import netNeutralitySm from '../Articles/images/netNeutralitySm.jpg';
import vim from '../Articles/images/vim.jpg';
import vimSm from '../Articles/images/vimSm.png';
import toughMudder from '../Articles/images/toughMudder.jpg';
import toughMudderSm from '../Articles/images/toughMudderSm.jpg';
import rustSm from '../Articles/images/rustSm.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Articles = () => (
  <div>
    <PageSwitchScroller />
    <ArticleCard
      day={null}
      month={null}
      className={getClassName('pages__card')}
      fillImageSrc={null}
      imageSrc={rustSm}
      linkUrl="/articles/week-of-rust"
      title="My week of Rust"
    />
    <ArticleCard
      light
      imageBorder="darkorange"
      day={null}
      month={null}
      className={getClassName('pages__card')}
      fillImageSrc={toughMudder}
      imageSrc={toughMudderSm}
      linkUrl="/articles/tough-mudder"
      title="Running 5 Tough Mudders"
    />
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
