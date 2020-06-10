import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import Image from 'components/Image';
import VPNWarning_dark from './VPNWarning_dark.png';
import VPNWarning_light from './VPNWarning_light.png';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

import { Button } from 'gg-components/Button';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class WorkSideProjects extends Component {
  state = {};

  render() {
    return (
      <div className={getClassName('pages__container--prose')}>
        <Helmet title="Side projects" />
        <PageTitle link={{ to: '/work', text: 'Work' }} name="Side projects">
          <SubSection name="VPN Video Checker">
            <Paragraph>
              While we&apos;re in lockdown, many of us are relying on video
              calls and VPNs to do our work. But video calls can place a lot of
              strain on VPNs and streaming via a VPN often results in a flaky
              video call experience.
              <br />
              To remind members of my team to disconnect from the VPN when
              joining a video call, I created a small utility that checks and
              notifies you whenever you&apos;re simultaneously on a call whilst
              connected to a VPN. It&apos;s available to{' '}
              <TextLink
                external
                href="https://apps.apple.com/us/app/vpn-video-checker/id1509398961?ls=1"
              >
                download for free from the macOS App Store
              </TextLink>
              .
            </Paragraph>
            <Image
              className={getClassName('pages__image')}
              altText={'VPN Zoom warning notification'}
              width={462}
              height={122}
              lightSrc={VPNWarning_light}
              darkSrc={VPNWarning_dark}
            />
          </SubSection>

          <SubSection name="Browser scripts">
            <Paragraph>
              I automate pretty much everything I can, often in the form of
              browser-scripts. I have built several little nuggets of JS that
              help me on a day to day basis, and they can be run in any browser
              via an extension such as{' '}
              <TextLink external href="https://www.tampermonkey.net/">
                Tamper Monkey
              </TextLink>
              .
            </Paragraph>
            <br />
            <Button
              className={getClassName('pages__component--upper-margin')}
              hrefExternal
              href="https://github.com/georgegillams/browser-scripts/#browser-scripts"
            >
              Browser scripts →
            </Button>
          </SubSection>

          {/* <SubSection name="Redux definitions">
            <Paragraph>
              After a while using Redux, I became frustrated with the
              overly-verbose and repetitive nature of its components. I,
              therefore, wrote some helpers to reduce the repetitiveness, and
              eventually, they grew into a complete library for generating redux
              components from a single source of truth. Because of the organic
              way in which I built this from the ground up, the library is
              completely interoperable with hand-coded redux components, meaning
              that it can be adopted gradually in an existing codebase using
              redux.
            </Paragraph>
            <br />
            <Button
              className={getClassName('pages__component--upper-margin')}
              hrefExternal
              href="https://github.com/georgegillams/redux-definitions/"
            >
              Check out redux-definitions on GitHub →
            </Button>
          </SubSection> */}

          <SubSection name="Party Parrot">
            <Paragraph>
              As a developer and advocate for open source, having a contribution
              to the{' '}
              <TextLink external href="https://cultofthepartyparrot.com/">
                official Party Parrot repo{' '}
              </TextLink>{' '}
              is a proud achievement.
            </Paragraph>
            <FadingLazyLoadedImage
              width={60}
              height={60}
              style={{ width: '4rem' }}
              src="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif"
            />
          </SubSection>
        </PageTitle>
      </div>
    );
  }
}
