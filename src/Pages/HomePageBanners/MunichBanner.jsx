import React from 'react';
import SimpleBanner from './SimpleBanner';
import munich from '../Travel/images/munich.jpg';

const IcelandBanner = () => (
  <SimpleBanner imageSrc={munich} linkUrl="/travel/munich-2017" title="Munich 2017" />
);

export default IcelandBanner;
