import React from 'react';

import { HP_CARD_LAYOUT } from './HomepageCard-constants';

import Section from '@george-gillams/components/section';
import {
  DualCardWrapper,
  StyledBlogCard,
  StyledMedalCard,
  StyledMedals,
  StyledParagraph,
  StyledPhotoGallery,
  StyledPhotographyCard,
  Wrapper,
} from './life-section.styles';
import { ScrollAnimationWrapper } from '@george-gillams/components/effects';

const LifeSection = props => {
  const { ...rest } = props;

  return (
    <Wrapper {...rest}>
      <Section name="About">
        <StyledParagraph>I love travel, photography, and obstacle course racing.</StyledParagraph>
        <ScrollAnimationWrapper>
          <DualCardWrapper>
            <StyledBlogCard
              title="Blog"
              blurb="I occasionally write about tech, photography and OCR."
              linkText="Blog →"
              href="/blog"
              layout={HP_CARD_LAYOUT.COLUMN}>
              {/* <StyledBlogGallery /> */}
            </StyledBlogCard>
            <StyledPhotographyCard
              title="Photography"
              blurb="Check out my photos. Disclaimer: 99% of them are the dog."
              linkText="Photos →"
              href="/photography"
              layout={HP_CARD_LAYOUT.COLUMN}>
              <StyledPhotoGallery />
            </StyledPhotographyCard>
          </DualCardWrapper>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <StyledMedalCard
            title="Racing"
            blurb="Visit my virtual medal shelf."
            linkText="Medals →"
            href="/medals"
            layout={HP_CARD_LAYOUT.AUTO}>
            <StyledMedals />
          </StyledMedalCard>
        </ScrollAnimationWrapper>
      </Section>
    </Wrapper>
  );
};

export default LifeSection;
