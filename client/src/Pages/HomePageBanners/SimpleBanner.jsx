import React from 'react';
import { NavLink } from 'react-router-dom';
import PageContentContainer from '../../components/PageContentContainer';
import Section from './../../components/Section';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SimpleBanner = props => {
  const { light, title, imageSrc, linkUrl, ...rest } = props;

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
            <NavLink to={linkUrl}>
              <Section light={light} name={title} link />
            </NavLink>
          </div>
        </PageContentContainer>
      </div>
    </main>
  );
};

export default SimpleBanner;
