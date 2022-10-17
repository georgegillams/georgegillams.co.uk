import React from 'react';
import PropTypes from 'prop-types';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import Image from '@george-gillams/components/image';
import Section from '@george-gillams/components/section';
import TextLink from 'components/common/TextLink';

import travel from './images/travel.jpg';
import cat from './images/cat.jpg';
import {
  Content,
  ImageAboveTabletLeft,
  ImageAboveTabletRight,
  MobileImageInnerWrapperLeft,
  MobileImageInnerWrapperRight,
  MobileImageWrapper,
  StyledParagraph,
  Wrapper,
} from './life-section.styles';
import { JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

const LEFT_IMAGE_HIDE_CLASSNAME = 'home__life-section-image--left-hide';
const RIGHT_IMAGE_HIDE_CLASSNAME = 'home__life-section-image--right-hide';

const LifeSection = props => {
  const { scrollPositionVh, fullyInView, ...rest } = props;

  cleanRestScrollProps(rest);

  const scrollFactor = Math.min(100, Math.max(0, 40 + scrollPositionVh)) / 100;

  const scrollOffsetMin1 = 1;
  const scrollOffsetMax1 = 5;
  const scrollOffsetRange1 = scrollOffsetMax1 - scrollOffsetMin1;
  const scrollOffsetMin2 = -6;
  const scrollOffsetMax2 = 8;
  const scrollOffsetRange2 = scrollOffsetMax2 - scrollOffsetMin2;
  const scrollPositionOffset1 = scrollOffsetMin1 + scrollOffsetRange1 * scrollFactor;
  const scrollPositionOffset2 = scrollOffsetMin2 + scrollOffsetRange2 * scrollFactor;

  const rotationMin1 = -15;
  const rotationMax1 = -4;
  const rotationRange1 = rotationMax1 - rotationMin1;
  const rotationMin2 = 3;
  const rotationMax2 = 7;
  const rotationRange2 = rotationMax2 - rotationMin2;
  const rotationPosition1 = rotationMin1 + rotationRange1 * scrollFactor;
  const rotationPosition2 = rotationMin2 + rotationRange2 * scrollFactor;

  return (
    <Wrapper {...rest}>
      <ImageAboveTabletLeft
        style={{ marginTop: `${scrollPositionOffset1}rem`, transform: `rotate(${rotationPosition1}deg)` }}
        imgProps={{
          alt: '',
        }}
        aspectX={4000}
        aspectY={6000}
        lightSrc={travel}
        darkSrc={travel}
      />
      <Content>
        <Section name="Life">
          <StyledParagraph>
            I love travel, photography, and obstacle course racing.
            <br />
            <TextLink href="/blog">Blog</TextLink>
            <br />
            <TextLink href="/photography">Photography</TextLink>
          </StyledParagraph>
        </Section>
        <StyledParagraph>I live on the south coast of the UK with my wife, cat and dog.</StyledParagraph>
      </Content>
      <ImageAboveTabletRight
        style={{ marginTop: `${scrollPositionOffset2}rem`, transform: `rotate(${rotationPosition2}deg)` }}
        imgProps={{
          alt: '',
        }}
        aspectX={5913}
        aspectY={3942}
        lightSrc={cat}
        darkSrc={cat}
      />
      <MobileImageWrapper>
        <style>
          {`
          .${JS_CLASSNAME} .${LEFT_IMAGE_HIDE_CLASSNAME} {
          margin-left: -20vw;
                opacity: 0;
          }
          .${JS_CLASSNAME} .${RIGHT_IMAGE_HIDE_CLASSNAME} {
          margin-right: -20vw;
                opacity: 0;
          }
          `}
        </style>
        <MobileImageInnerWrapperLeft className={fullyInView ? '' : LEFT_IMAGE_HIDE_CLASSNAME}>
          <Image
            imgProps={{
              alt: '',
            }}
            aspectX={4000}
            aspectY={6000}
            lightSrc={travel}
            darkSrc={travel}
          />
        </MobileImageInnerWrapperLeft>
        <MobileImageInnerWrapperRight className={fullyInView ? '' : RIGHT_IMAGE_HIDE_CLASSNAME}>
          <Image
            imgProps={{
              alt: '',
            }}
            aspectX={5913}
            aspectY={3942}
            lightSrc={cat}
            darkSrc={cat}
          />
        </MobileImageInnerWrapperRight>
      </MobileImageWrapper>
    </Wrapper>
  );
};

LifeSection.propTypes = {
  scrollPositionVh: PropTypes.number.isRequired,
  fullyInView: PropTypes.bool.isRequired,
};

LifeSection.defaultProps = {};

export default withScroll(LifeSection);
