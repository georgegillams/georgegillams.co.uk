import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import { PageContainer } from '@george-gillams/components/PageContainer';
import PageTitle from 'components/common/PageTitle';
import WorkSection from 'components/HomePageV2/WorkSection';
import LifeSection from 'components/HomePageV2/LifeSection';
import PhotoSection from 'components/HomePageV2/PhotoSection';
import AboutSection from 'components/HomePageV2/AboutSection';

import STYLES from './home.scss';

const getClassName = cssModules(STYLES);

const HomePage = props => {
  const { ...rest } = props;

  return (
    <PageContainer centred>
      <PageTitle name="Hey! I'm George." pageTitle="Home" className={getClassName('home__title-section')} {...rest}>
        <WorkSection className={getClassName('home__work-section')} />
        <LifeSection className={getClassName('home__life-section')} />
        <PhotoSection className={getClassName('home__photo-section')} />
        <AboutSection className={getClassName('home__about-section')} />
      </PageTitle>
    </PageContainer>
  );
};

HomePage.propTypes = {
  className: PropTypes.string,
};

HomePage.defaultProps = {
  className: null,
};

export default HomePage;
