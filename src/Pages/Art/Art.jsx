import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLoadingBehavior } from 'bpk-component-image';
import ArticleCard, { CARD_LAYOUTS } from '../../components/ArticleCard';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import Comments from '../../components/Comments';
import LicenseInfo from '../../components/LicenseInfo';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';
import withLazyLoading from '../../components/withLazyLoading';
import AnimatedContent from '../../components/AnimatedContent';
import withGraphicContentBehaviour from '../../components/withGraphicContentBehaviour';
import GraphicContent from '../../components/GraphicContent';

import STYLES from '../pages.scss';

const GcbGraphicContent = withGraphicContentBehaviour(GraphicContent);

const getClassName = className => STYLES[className] || 'UNKNOWN';
const PAGE_ID = 857216;
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const Art = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <PageSwitchScroller />
      <LlAnimatedContent>
        <Section name="Photography">
          <LlAnimatedContent>
            <div
              style={{ paddingTop: '1rem' }}
              className={getClassName('pages__compact-card-container')}
            >
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                imageSrc="https://i.imgur.com/Jng7EhH.png"
                href="https://gurushots.com/georgegillams/achievements"
                title="Find me on GuruShots"
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                imageSrc="https://i.imgur.com/u30cQWU.png"
                href="https://www.flickr.com/people/137198167@N03/"
                title="Find me on Flickr"
              />
            </div>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="Harlequins vs Worcester Rugby Match">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Harlequins vs Worcester Rugby Match"
                width={4130}
                height={2394}
                src="https://i.imgur.com/OsFI23z.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="The cat looking handsome as ever!">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="The cat looking handsome as ever!"
                width={5184}
                height={3456}
                src="https://i.imgur.com/Aqy3tuA.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="A training scenario at EPICC 2017">
              <GcbGraphicContent className={getClassName('pages__image')}>
                <FadingLazyLoadedImage
                  altText="A training scenario at EPICC 2017"
                  width={5184}
                  height={3132}
                  src="https://i.imgur.com/6B35GTV.jpg"
                />
              </GcbGraphicContent>
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="Dog running with a Stick">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Dog running with a Stick"
                width={3000}
                height={2000}
                src="https://i.imgur.com/8dnCZ5D.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="Stunt Motorcyclist">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Stunt Motorcyclist"
                width={3000}
                height={2000}
                src="https://i.imgur.com/WlLYxDw.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="Longleat Festival of Light">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Longleat Festival of Light"
                width={3000}
                height={2000}
                src="https://i.imgur.com/EHF7zqM.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection noAnchor name="Serre Chevalier">
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Serre Chevalier"
                width={3000}
                height={2000}
                src="https://i.imgur.com/gIccH4E.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
          <LlAnimatedContent>
            <SubSection
              noAnchor
              name="Nick Matthew playing in the Canary Wharf Open"
            >
              <FadingLazyLoadedImage
                className={getClassName('pages__image')}
                altText="Nick Matthew playing in the Canary Wharf Open"
                width={3000}
                height={2000}
                src="https://i.imgur.com/h4BFWqS.jpg"
              />
            </SubSection>
          </LlAnimatedContent>
        </Section>
        <LlAnimatedContent>
          <Section name="Photoshop">
            <LlAnimatedContent>
              <SubSection noAnchor name="Tulips exploding with light">
                For some reason the idea of light exploding out of tulips popped
                into my mind, so I went out to find some and made it a reality.
                I used a similar effect in Art that I had used in the past to
                create beams of sunlight breaking through the clouds, and then
                darkened the background a little.
                <br />
                <br />
                <FadingLazyLoadedImage
                  className={getClassName('pages__image')}
                  altText="Exploding tulips"
                  width={3000}
                  height={2000}
                  src="https://i.imgur.com/PIKQ2D6.jpg"
                />
              </SubSection>
            </LlAnimatedContent>
            <LlAnimatedContent>
              <SubSection noAnchor name="Miss Saigon sketch">
                With Miss Saigon coming to cinemas soon for one day only, I was
                inspired to draw the production logo (aka tempted to
                procrastinate).
                <br />
                <br />
                <FadingLazyLoadedImage
                  className={getClassName('pages__image')}
                  altText="Miss Saigon"
                  width={2153}
                  height={3000}
                  src="https://i.imgur.com/y3i2Ll1.jpg"
                />
              </SubSection>
            </LlAnimatedContent>
            <LlAnimatedContent>
              <SubSection
                noAnchor
                name="Dual-carriageway light-painting (in post)"
              >
                One evening after leaving work at an unearthly hour, I shot this
                uninspired photo. In Photoshop, I then used the brush tool and
                some layer styles to create a 'painting with light' effect.
                <br />
                <br />
                <FadingLazyLoadedImage
                  className={getClassName('pages__image')}
                  altText="Dual-carriageway light-painting"
                  width={3000}
                  height={2000}
                  src="https://i.imgur.com/T502lkX.jpg"
                />
              </SubSection>
            </LlAnimatedContent>
          </Section>
        </LlAnimatedContent>
        <LlAnimatedContent>
          <Section name="Food is art! (...sometimes)">
            <LlAnimatedContent>
              <SubSection noAnchor name="Guinness cake">
                I like spending time on food presentation when the opportunity
                calls for it. So I created this masterpiece to share with the
                office and celebrate a legendary drink!
                <br />
                <br />
                <FadingLazyLoadedImage
                  className={getClassName('pages__image')}
                  altText="Guinness cake"
                  width={3000}
                  height={2000}
                  src="https://i.imgur.com/oBWlSDO.jpg"
                />
              </SubSection>
            </LlAnimatedContent>
            <LlAnimatedContent>
              <SubSection noAnchor name="Ratatouille">
                To get us in the mood for Disneyland, I cooked up this
                Ratatouille in the style of the dish served in the film. It came
                out better than I expected... Pretty pleased with the result!
                <br />
                <br />
                <FadingLazyLoadedImage
                  className={getClassName('pages__image')}
                  altText="Ratatouille"
                  width={3000}
                  height={2000}
                  src="https://i.imgur.com/kRGhYxz.jpg"
                />
              </SubSection>
            </LlAnimatedContent>
          </Section>
        </LlAnimatedContent>
      </LlAnimatedContent>
      <br />
      <LicenseInfo centered />
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

Art.propTypes = {
  className: PropTypes.string,
};

Art.defaultProps = {
  className: null,
};

export default Art;
