import React from 'react';
import SimpleBanner from './SimpleBanner';
import iceland from '../Travel/images/iceland2.jpg';

const IcelandBanner = () => (
  <SimpleBanner light imageSrc={iceland} linkUrl="/travel/iceland-2018" title="Iceland 2018" />
);

export default IcelandBanner;
