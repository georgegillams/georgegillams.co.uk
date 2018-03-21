import React from 'react';
import LicenseInfo from '../../components/LicenseInfo';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ArticleCard from '../../components/ArticleCard';
import iceland from '../Travel/images/iceland2.jpg';
import longleat from '../Travel/images/longleatLight.jpg';
import munich from '../Travel/images/munich.jpg';
import mickeyMouse from '../Travel/images/mickeyMouse.jpg';
import serreChevalier from '../Travel/images/serreChevalier.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Travel = () => (
  <div style={{ width: '100%' }}>
    {' '}
    <PageSwitchScroller />
    <ArticleCard
      day="01-07"
      month="Jan"
      className={getClassName('pages__card')}
      imageSrc={iceland}
      linkUrl="/travel/iceland-2018"
      title="Iceland 2018"
      autoTallLayout
    />
    <ArticleCard
      day={27}
      month="Dec"
      className={getClassName('pages__card')}
      imageSrc={longleat}
      linkUrl="/travel/longleat-2017"
      title="Longleat 2017"
      autoTallLayout
    />
    <ArticleCard
      day="15-20"
      month="Dec"
      className={getClassName('pages__card')}
      imageSrc={munich}
      linkUrl="/travel/munich-2017"
      title="Munich 2017"
      autoTallLayout
    />
    <ArticleCard
      day="19-23"
      month="Jun"
      className={getClassName('pages__card')}
      imageSrc={mickeyMouse}
      linkUrl="/travel/disneyland-2017"
      title="Disneyland 2017"
      autoTallLayout
    />
    <ArticleCard
      day="26-02"
      month="Mar"
      className={getClassName('pages__card')}
      imageSrc={serreChevalier}
      linkUrl="/travel/serre-chevalier-2017"
      title="Serre Chevalier 2017"
      autoTallLayout
    />
  </div>
);

export default Travel;
