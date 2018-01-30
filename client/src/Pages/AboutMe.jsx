import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import TextLink from './../components/TextLink';
import Section from './../components/Section';
import SubSection from './../components/SubSection';
import PhotoGallery from './../components/PhotoGallery';
import georgeAndCharlie2 from '../images/georgeAndCharlie2.jpg';
import georgeAndCharlie3 from '../images/georgeAndCharlie3_squished.jpg';
import tiggy from '../images/tiggy.jpg';
import toughMudder from '../images/toughMudder_squished.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const AboutMe = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <Section name="Hi! I'm George.">
        I&apos;m an open-source software engineer at{' '}
        <TextLink external href="https://www.skyscanner.net/">
          Skyscanner
        </TextLink>, passionate about design, <TextLink href="/travel">travel</TextLink> and
        photography. When I&apos;m not internationally photobombing unsuspecting strangers I&apos;m
        based somewhere between Southampton and London.
        <br />
        <br />
        I enjoy getting outdoors and trying new things, and will be completing my 5th{' '}
        <TextLink external href="https://toughmudder.co.uk/">
          Tough Mudder
        </TextLink>{' '}
        in May 2018. I also try to squeeze in as much volunteering as I can, so you may find me
        dressed as a{' '}
        <TextLink external href="https://helpforheroes.org.uk/">
          Help for Heroes
        </TextLink>{' '}
        bear, reviewing content for{' '}
        <TextLink external href="https://b-eat.co.uk/">
          Beat
        </TextLink>, or submitting PR's to{' '}
        <TextLink external href="https://github.com/mozilla">
          Mozilla
        </TextLink>&apos;s open-source. I look forward to doing more of all that when I finish my
        Masters.
        <br />
        <br />
        I recently got engaged to my beautiful fiancée in{' '}
        <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and live with her and Tigger
        the cat.
        <br />
        <br />
        <PhotoGallery
          className={getClassName('pages__photo-gallery')}
          images={[georgeAndCharlie2, georgeAndCharlie3, tiggy, toughMudder]}
        />
        <br />
        <br />
        This site is built in React and hosted on Heroku. I have a Redis database provisioned on
        Heroku.
        <br />
        I use this site to experiment with things, share stuff I've figured out, and allow people to
        reach-out to me. So if you're interested in anything I do,{' '}
        <TextLink href="/contact">get in touch</TextLink>!
      </Section>
    </main>
  );
};

AboutMe.propTypes = {
  className: PropTypes.string,
};

AboutMe.defaultProps = {
  className: null,
};

export default AboutMe;
