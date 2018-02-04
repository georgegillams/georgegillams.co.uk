import React from 'react';
import PageContentContainer from '../../components/PageContentContainer';
import Section from './../../components/Section';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SimpleBanner = (props) => {
  const {
    light, title, imageSrc, linkUrl, ...rest
  } = props;

  return (
    <main className={getClassName('pages__banner')}>
      <div
        className={getClassName('pages__banner-image')}
        style={{
          backgroundColor: light ? '#1E1E1E' : 'none',
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        <PageContentContainer>
          <div className={getClassName('pages__banner-container')}>
            <a href={linkUrl}>
              <Section light={light} name={title} link />
            </a>
          </div>
        </PageContentContainer>
      </div>
    </main>
  );
};

export default SimpleBanner;
