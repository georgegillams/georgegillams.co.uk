import React from 'react';
import PropTypes from 'prop-types';

import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import Image from '@george-gillams/components/image';
import Paragraph from '@george-gillams/components/paragraph';
import Section from '@george-gillams/components/section';
import TextLink from 'components/common/TextLink';

import { useEntryAnimationClientOnly } from '@george-gillams/components/server-side-rendering';
import travel from './images/travel.jpg';
import cat from './images/cat.jpg';

const getClassName = c => c;

const LifeSection = props => {
  const { scrollPositionVh, fullyInView, className, ...rest } = props;

  const [isFirstRender, animationsEnabled] = useEntryAnimationClientOnly();

  cleanRestScrollProps(rest);

  const scrollFactor = Math.min(100, Math.max(0, 40 + scrollPositionVh)) / 100;

  const scrollOffsetMin1 = 1;
  const scrollOffsetMax1 = 5;
  const scrollOffsetRange1 = scrollOffsetMax1 - scrollOffsetMin1;
  const scrollOffsetMin2 = -6;
  const scrollOffsetMax2 = 8;
  const scrollOffsetRange2 = scrollOffsetMax2 - scrollOffsetMin2;
  const scrollPositionOffset1 = isFirstRender ? scrollOffsetMax1 : scrollOffsetMin1 + scrollOffsetRange1 * scrollFactor;
  const scrollPositionOffset2 = isFirstRender ? scrollOffsetMax2 : scrollOffsetMin2 + scrollOffsetRange2 * scrollFactor;

  const rotationMin1 = -15;
  const rotationMax1 = -4;
  const rotationRange1 = rotationMax1 - rotationMin1;
  const rotationMin2 = 3;
  const rotationMax2 = 7;
  const rotationRange2 = rotationMax2 - rotationMin2;
  const rotationPosition1 = rotationMin1 + rotationRange1 * scrollFactor;
  const rotationPosition2 = rotationMin2 + rotationRange2 * scrollFactor;

  return (
    <div className={getClassName('life-section__outer', className)} {...rest}>
      <Image
        className={getClassName('life-section__image-above-tablet', 'life-section__image-above-tablet--left')}
        style={{ marginTop: `${scrollPositionOffset1}rem`, transform: `rotate(${rotationPosition1}deg)` }}
        imgProps={{
          alt: '',
        }}
        aspectX={4000}
        aspectY={6000}
        lightSrc={travel}
        darkSrc={travel}
      />
      <div className={getClassName('life-section__content')}>
        <Section name="Life">
          <Paragraph className={getClassName('life-section__paragraph')}>
            I love travel and photography, and occasionally write other stuff.
            <br />
            <TextLink href="/blog">Blog</TextLink>
            <br />
            <TextLink href="/photography">Photography</TextLink>
          </Paragraph>
        </Section>
        <Paragraph className={getClassName('life-section__paragraph')}>
          I live on the south coast of the UK with my wife, cat and dog.
        </Paragraph>
      </div>
      <Image
        className={getClassName('life-section__image-above-tablet', 'life-section__image-above-tablet--right')}
        style={{ marginTop: `${scrollPositionOffset2}rem`, transform: `rotate(${rotationPosition2}deg)` }}
        imgProps={{
          alt: '',
        }}
        aspectX={5913}
        aspectY={3942}
        lightSrc={cat}
        darkSrc={cat}
      />
      <div className={getClassName('life-section__mobile-image-container')}>
        <div className={getClassName('life-section__mobile-image-wrapper', 'life-section__mobile-image-wrapper--left')}>
          <Image
            className={getClassName(
              'life-section__image-below-tablet',
              'life-section__image-below-tablet--left',
              animationsEnabled ? 'life-section__image-below-tablet--animated' : '',
              fullyInView || isFirstRender ? '' : 'life-section__image-below-tablet--left-hide'
            )}
            // style={{ marginTop: `${scrollPositionOffset1}rem` }}
            imgProps={{
              alt: '',
            }}
            aspectX={4000}
            aspectY={6000}
            lightSrc={travel}
            darkSrc={travel}
          />
        </div>
        <div
          className={getClassName('life-section__mobile-image-wrapper', 'life-section__mobile-image-wrapper--right')}>
          <Image
            className={getClassName(
              'life-section__image-below-tablet',
              'life-section__image-below-tablet--right',
              animationsEnabled ? 'life-section__image-below-tablet--animated' : '',
              fullyInView || isFirstRender ? '' : 'life-section__image-below-tablet--right-hide'
            )}
            // style={{ marginTop: `${scrollPositionOffset1}rem` }}
            imgProps={{
              alt: '',
            }}
            aspectX={5913}
            aspectY={3942}
            lightSrc={cat}
            darkSrc={cat}
          />
        </div>
      </div>
    </div>
  );
};

LifeSection.propTypes = {
  scrollPositionVh: PropTypes.number.isRequired,
  fullyInView: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

LifeSection.defaultProps = { className: null };

export default withScroll(LifeSection);
