import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import { Paragraph, TextLink, Section } from 'gg-components/dist/Typography';
const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class Contact extends Component {
  state = {};

  render() {
    return (
      <Section name="Hey! I'm George.">
        <Paragraph>
          I&apos;m an open-source software engineer at{' '}
          <TextLink external href="https://www.skyscanner.net/">
            Skyscanner
          </TextLink>
          . I am passionate about design,{' '}
          <TextLink href="/travel">travel</TextLink> and{' '}
          <TextLink href="/photography">photography</TextLink>, for which I have
          an unsatisfiable hunger. When I&apos;m not internationally
          photobombing unsuspecting strangers I&apos;m based somewhere between
          Portsmouth and London.
          <br />
          <br />I enjoy getting outdoors and trying new things, and completed my
          5th <TextLink href="/blog/tough-mudder">Tough Mudder</TextLink> in May
          2018. I also try to squeeze in as much volunteering as I can, so you
          may find me dressed as a{' '}
          <TextLink external href="https://helpforheroes.org.uk/">
            Help for Heroes
          </TextLink>{' '}
          bear, reviewing content for{' '}
          <TextLink external href="https://b-eat.co.uk/">
            Beat
          </TextLink>
          , or submitting PR's to
          <TextLink external href="https://github.com/mozilla">
            Mozilla &apos;s open-source
          </TextLink>
          .
          <br />
          <br />I recently got engaged to my wonderful fiancée while we were in{' '}
          <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and live
          with her and Tigger the cat.
        </Paragraph>
        <FadingLazyLoadedImage
          className={getClassName('pages__image')}
          altText="Me"
          width={3829}
          height={2872}
          src="https://i.imgur.com/0jz5elM.jpg"
        />
        <Paragraph>
          This site is built in React and hosted on Heroku where I have a Redis
          database provisioned. Redux is used to invoke API functions when pages
          are server-side rendered, and also when calls are made from the
          browser.
          <br />I use this site to experiment with things, share stuff I've
          figured out, and allow people to reach-out to me. So if you're
          interested in anything I do,{' '}
          <TextLink href="/contact">get in touch</TextLink>!
        </Paragraph>
      </Section>
    );
  }
}