import React from 'react';
import PropTypes from 'prop-types';

import PageContainer from 'components/common/PageContainer';
import PageTitle from 'components/common/PageTitle';
import { StyledAboutSection, StyledLifeSection, StyledPhotoSection, StyledWorkSection } from './home.styles';
import { ScrollAnimationWrapper } from '@george-gillams/components/effects';

const getClassName = c => c;

const HomePage = props => {
  const { ...rest } = props;

  return (
    <PageContainer centred>
      <PageTitle name="Hey! I'm George." pageTitle="Home" className={getClassName('home__title-section')} {...rest}>
        <ScrollAnimationWrapper>
          <StyledWorkSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <StyledLifeSection />
        </ScrollAnimationWrapper>
        <StyledPhotoSection />
        <ScrollAnimationWrapper>
          <StyledAboutSection />
        </ScrollAnimationWrapper>
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
