import React from 'react';
import PageContentContainer from '../../components/PageContentContainer';
import Section from './../../components/Section';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const SimpleBanner = props => (
  <main className={getClassName('pages__banner')}>
    <div className={getClassName('pages__banner-image')} style={{ backgroundImage: `url(${props.imageSrc})` }} >
      <PageContentContainer>
        <div className={getClassName('pages__banner-container')}>
          <a className={getClassName('pages__link')} href={props.linkUrl}>
            <Section light={props.light} name={props.title} textClassName={getClassName('pages__link')} />
          </a>
        </div>
      </PageContentContainer>
    </div>
  </main>
);

export default SimpleBanner;
