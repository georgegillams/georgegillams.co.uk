import React from 'react';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import Button from '@george-gillams/components/button';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import Image from '@george-gillams/components/image';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import STYLES from './work-side-projects.scss';

import VPNWarningLight from './VPNWarning_light.png';
import VPNWarningDark from './VPNWarning_dark.png';
import SraLevelLight from './SraLevel_light.png';
import SraLevelDark from './SraLevel_dark.png';

const getClassName = cssModules(STYLES);

const WorkSideProjects = () => (
  <PageTitle link={{ to: '/work', text: 'Work' }} name="Side projects">
    <Subsection name="Backpack transpiled">
      <Paragraph>
        At Skyscanner, we publish{' '}
        <TextLink href="https://backpack.github.io/" hrefExternal>
          Backpack
        </TextLink>{' '}
        web libraries untranspiled, as several different packages.
        <br />
        <br />
        backpack-transpiled is a single package, containing all the web components available in Backpack. Thanks to
        modern code-splitting and tree-shaking techniques, it&#39;s possible to import a single component from this
        package without negatively affecting bundle size.
        <br />
        <br />
        Because backpack-transpiled is completely transpiled, there&#39;s no need to use{' '}
        <TextLink hrefExternal href="https://www.npmjs.com/package/backpack-react-scripts">
          backpack-react-scripts
        </TextLink>
        , or modify webpack config. It will work out of the box with a fresh create react app.
        <br />
        <Button
          className={getClassName('work-side-projects__component')}
          hrefExternal
          href="https://github.com/georgegillams/backpack-transpiled/">
          backpack-transpiled →
        </Button>
      </Paragraph>
    </Subsection>

    <Subsection name="VPN Video Checker">
      <Paragraph>
        While we&apos;re in lockdown, many of us are relying on video calls and VPNs to do our work. But video calls can
        place a lot of strain on VPNs and streaming via a VPN often results in a flaky video call experience.
        <br />
        To remind members of my team to disconnect from the VPN when joining a video call, I created a small utility
        that checks and notifies you whenever you&apos;re simultaneously on a call whilst connected to a VPN. It&apos;s
        available to{' '}
        <TextLink hrefExternal href="https://apps.apple.com/us/app/vpn-video-checker/id1509398961?ls=1">
          download for free from the macOS App Store
        </TextLink>
        .
      </Paragraph>
      <Image
        className={getClassName('work-side-projects__image')}
        imgProps={{
          alt: 'VPN Zoom warning notification',
        }}
        aspectX={462}
        aspectY={122}
        lightSrc={VPNWarningLight}
        darkSrc={VPNWarningDark}
      />
    </Subsection>

    <Subsection name="Screen Reader Adventures">
      <Paragraph>
        Using VoiceOver on macOS is not trivial. The keyboard commands are not intuitive, so I created an online game
        that gradually introduces new commands and VO concepts.
      </Paragraph>
      <Image
        className={getClassName('work-side-projects__image')}
        imgProps={{
          alt: 'Screen Reader Adventures level',
        }}
        aspectX={1041}
        aspectY={999}
        lightSrc={SraLevelLight}
        darkSrc={SraLevelDark}
      />
      <Button
        className={getClassName('work-side-projects__component')}
        hrefExternal
        href="https://www.screen-reader-adventures.com/">
        Screen Reader Adventures →
      </Button>
    </Subsection>

    <Subsection name="Browser scripts">
      <Paragraph>
        I automate pretty much everything I can, often in the form of browser-scripts. I have built several small
        utilities that help me on a day to day basis, and they can be run in any browser via an extension such as{' '}
        <TextLink hrefExternal href="https://www.tampermonkey.net/">
          Tamper Monkey
        </TextLink>
        .
      </Paragraph>
      <br />
      <Button
        className={getClassName('work-side-projects__component')}
        hrefExternal
        href="https://github.com/georgegillams/browser-scripts/#browser-scripts">
        Browser scripts →
      </Button>
    </Subsection>

    {/* <Subsection name="Redux definitions">
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
          </Subsection> */}

    <Subsection name="Party Parrot">
      <Paragraph>
        As a developer and advocate for open source, having a contribution to the{' '}
        <TextLink hrefExternal href="https://cultofthepartyparrot.com/">
          official Party Parrot repo{' '}
        </TextLink>{' '}
        is a proud achievement.
      </Paragraph>
      <Image
        aspectX={60}
        aspectY={60}
        style={{ width: '4rem' }}
        lightSrc="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif"
        darkSrc="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif"
        imgProps={{ alt: 'Open-source party parrot' }}
      />
    </Subsection>
  </PageTitle>
);

export default WorkSideProjects;
