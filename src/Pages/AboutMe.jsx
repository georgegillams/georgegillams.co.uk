import React from 'react';
import PropTypes from 'prop-types';
import TextLink from './../components/TextLink';
import Section from './../components/Section';
import PhotoGallery from './../components/PhotoGallery';
import withLazyLoading from './../components/withLazyLoading';
import AnimatedContent from './../components/AnimatedContent';

import STYLES from './pages.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);
const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const AboutMe = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <LlAnimatedContent>
        <Section name="Hi! I'm George.">
          <LlAnimatedContent>
            I&apos;m an open-source software engineer at{' '}
            <TextLink external href="https://www.skyscanner.net/">
              Skyscanner
            </TextLink>, passionate about design,{' '}
            <TextLink href="/travel">travel</TextLink> and photography. When
            I&apos;m not internationally photobombing unsuspecting strangers
            I&apos;m based somewhere between Southampton and London.
            <br />
            <br />
            I enjoy getting outdoors and trying new things, and will be
            completing my 5th{' '}
            <TextLink href="/blog/tough-mudder">Tough Mudder</TextLink> in May
            2018. I also try to squeeze in as much volunteering as I can, so you
            may find me dressed as a{' '}
            <TextLink external href="https://helpforheroes.org.uk/">
              Help for Heroes
            </TextLink>{' '}
            bear, reviewing content for{' '}
            <TextLink external href="https://b-eat.co.uk/">
              Beat
            </TextLink>, or submitting PR's to{' '}
            <TextLink external href="https://github.com/mozilla">
              Mozilla &apos;s open-source
            </TextLink>. I look forward to doing more of all that when I finish
            my Masters.
            <br />
            <br />
            I recently got engaged to my wonderful fiancée in{' '}
            <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and
            live with her and Tigger the cat.
            <br />
            <br />
            <LlAnimatedContent>
              <div className={getClassName('pages__photo-gallery-container')}>
                <PhotoGallery
                  className={getClassName('pages__photo-gallery')}
                  images={[
                    'https://i.imgur.com/EPfA1yI.png', // engaged
                    'https://i.imgur.com/eldzRhk.jpg', // us
                    'https://i.imgur.com/n8JZuqv.jpg', // tiggs
                    'https://i.imgur.com/mvvDmiL.jpg', // tm
                  ]}
                />
              </div>
            </LlAnimatedContent>
            <br />
            <br />
            <LlAnimatedContent>
              This site is built in React and hosted on Heroku where I have a
              Redis database provisioned.
              <br />
              I use this site to experiment with things, share stuff I've
              figured out, and allow people to reach-out to me. So if you're
              interested in anything I do,{' '}
              <TextLink href="/contact">get in touch</TextLink>!
            </LlAnimatedContent>
          </LlAnimatedContent>
        </Section>
      </LlAnimatedContent>
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
