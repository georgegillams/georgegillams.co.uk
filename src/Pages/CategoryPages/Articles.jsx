import React from 'react';
import Card from '../../components/Card';
import iceland from '../Travel/images/iceland2.jpg';
import netNeutrality from '../Articles/images/netNeutrality.jpg';
import vim from '../Articles/images/vim.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const Articles = () => (
  <div style={{ width: '100%' }}>
    <Card className={getClassName('pages__card')} imageSrc={netNeutrality} linkUrl="/articles/net-neutrality" title="My Take on Net Neutrality" />
    <Card className={getClassName('pages__card')} imageSrc={vim} linkUrl="/articles/vim" title="Switching to Vim" />
  </div>
);

export default Articles;

