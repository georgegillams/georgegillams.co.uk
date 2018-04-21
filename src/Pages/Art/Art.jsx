import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import ArticleCard, { CARD_LAYOUTS } from '../../components/ArticleCard';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import Comments from '../../components/Comments';
import LicenseInfo from '../../components/LicenseInfo';
import guinnessCake from '../Art/images/20160215.jpg';
import tulips from '../Art/images/20160409.jpg';
import motorway from '../Art/images/20160419.jpg';
import ratatouille from '../Art/images/20170616.jpg';
import missSaigon from '../Art/images/20161010.jpg';
import photog01 from '../Art/images/photog_02.jpg';
import photog02 from '../Art/images/photog_05.jpg';
import photog03 from '../Art/images/photog_01.jpg';
import photog04 from '../Art/images/photog_06.jpg';
import photog05 from '../Art/images/photog_04.jpg';
import photog06 from '../Art/images/photog_03.jpg';
import guruShotsIconLarge from '../Art/images/guruShotsSm.png';
import flickrIconLarge from '../Art/images/flickrSm.png';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const PAGE_ID = 857216;
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

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
      <Section name="Photography">
        <div
          style={{ paddingTop: '1rem' }}
          className={getClassName('pages__compact-card-container')}
        >
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            imageSrc={guruShotsIconLarge}
            href="https://gurushots.com/georgegillams/achievements"
            title="Find me on GuruShots"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            imageSrc={flickrIconLarge}
            href="https://www.flickr.com/people/137198167@N03/"
            title="Find me on Flickr"
          />
        </div>
        <SubSection noAnchor name="Dog running with a Stick">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Dog running with a Stick"
            width={3000}
            height={2000}
            src={photog01}
          />
        </SubSection>
        <SubSection noAnchor name="Stunt Motorcyclist">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Stunt Motorcyclist"
            width={3000}
            height={2000}
            src={photog02}
          />
        </SubSection>
        <SubSection noAnchor name="Longleat Festival of Light">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Longleat Festival of Light"
            width={3000}
            height={2000}
            src={photog03}
          />
        </SubSection>
        <SubSection noAnchor name="Serre Chevalier">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Serre Chevalier"
            width={3000}
            height={2000}
            src={photog04}
          />
        </SubSection>
        <SubSection
          noAnchor
          name="&quot;Thunder Mountain&quot; at Disneyland Paris"
        >
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="&quot;Thunder Mountain&quot; at Disneyland Paris"
            width={3000}
            height={2000}
            src={photog05}
          />
        </SubSection>
        <SubSection
          noAnchor
          name="Nick Matthew playing in the Canary Wharf Open"
        >
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Nick Matthew playing in the Canary Wharf Open"
            width={3000}
            height={2000}
            src={photog06}
          />
        </SubSection>
      </Section>
      <Section name="Photoshop">
        <SubSection noAnchor name="Tulips exploding with light">
          For some reason the idea of light exploding out of tulips popped into
          my mind, so I went out to find some and made it a reality. I used a
          similar effect in Art that I had used in the past to create beams of
          sunlight breaking through the clouds, and then darkened the background
          a little.
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Exploding tulips"
            width={3000}
            height={2000}
            src={tulips}
          />
        </SubSection>
        <SubSection noAnchor name="Miss Saigon sketch">
          With Miss Saigon coming to cinemas soon for one day only, I was
          inspired to draw the production logo (aka tempted to procrastinate).
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Miss Saigon"
            width={2153}
            height={3000}
            src={missSaigon}
          />
        </SubSection>
        <SubSection noAnchor name="Dual-carriageway light-painting (in post)">
          One evening after leaving work at an unearthly hour, I shot this
          uninspired photo. In Photoshop, I then used the brush tool and some
          layer styles to create a 'painting with light' effect.
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Dual-carriageway light-painting"
            width={3000}
            height={2000}
            src={motorway}
          />
        </SubSection>
      </Section>
      <Section name="Food is art! (...sometimes)">
        <SubSection noAnchor name="Guinness cake">
          I like spending time on food presentation when the opportunity calls
          for it. So I created this masterpiece to share with the office and
          celebrate a legendary drink!
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Guinness cake"
            width={3000}
            height={2000}
            src={guinnessCake}
          />
        </SubSection>
        <SubSection noAnchor name="Ratatouille">
          To get us in the mood for Disneyland, I cooked up this Ratatouille in
          the style of the dish served in the film. It came out better than I
          expected... Pretty pleased with the result!
          <br />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Ratatouille"
            width={3000}
            height={2000}
            src={ratatouille}
          />
        </SubSection>
      </Section>
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
