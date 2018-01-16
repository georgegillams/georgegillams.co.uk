import React from 'react';
import Card from '../../components/Card';
import iceland from '../Travel/images/iceland2.jpg';
import longleat from '../Travel/images/longleatLight.jpg';
import munich from '../Travel/images/munich.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const Travel = () => (
  <div style={{ width: '100%' }}>
    <Card className={getClassName('pages__card')} light imageSrc={iceland} linkUrl="/travel/iceland-2018" title="Iceland 2018" />
    <Card className={getClassName('pages__card')} light imageSrc={longleat} linkUrl="/travel/longleat-2017" title="Longleat 2017" />
    <Card className={getClassName('pages__card')} light imageSrc={munich} linkUrl="/travel/munich-2017" title="Munich 2017" />
  </div>
);

export default Travel;
