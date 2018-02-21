import React from 'react';
import SimpleBanner from './SimpleBanner';
import netNeutrality from '../Articles/images/netNeutrality.jpg';

const NetNeutralityBanner = () => (
  <SimpleBanner
    imageSrc={netNeutrality}
    linkUrl="/blog/net-neutrality"
    title="My Take on Net Neutrality"
  />
);

export default NetNeutralityBanner;
