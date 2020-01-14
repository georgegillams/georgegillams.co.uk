import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import { Button } from 'gg-components/dist/Button';
import {
  Paragraph,
  Section,
  SubSection,
  TextLink,
} from 'gg-components/dist/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class Work extends Component {
  state = {};

  render() {
    return (
      <div className={getClassName('pages__container--prose')}>
        <Helmet title="Work" />
        <Section name="Work">
          <SubSection name="Fundamentally open-source">
            <Paragraph>
              I believe that when we share, we all get more out of the code we
              write. That’s why I always prefer working on open-source projects.
            </Paragraph>
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
            <Button
              className={getClassName('pages__component--upper-margin')}
              hrefExternal
              href="https://github.com/georgegillams/browser-scripts/"
            >
              Browse and install my browser-scripts →
            </Button>
          </SubSection>

          <SubSection name="Redux definitions">
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
            <Button
              className={getClassName('pages__component--upper-margin')}
              hrefExternal
              href="https://github.com/georgegillams/redux-definitions/"
            >
              Check out redux-definitions on GitHub →
            </Button>
          </SubSection>

          <SubSection name="Party Parrot">
            <Paragraph>
              As a developer and advocate for open source, having a contribution
              to the{' '}
              <TextLink external href="https://cultofthepartyparrot.com/">
                official Party Parrot repo{' '}
              </TextLink>{' '}
              was a proud moment.
            </Paragraph>
            <FadingLazyLoadedImage
              width={60}
              height={60}
              style={{ width: '4rem' }}
              src="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif"
            />
          </SubSection>

          <SubSection name="EPICC Conference">
            <Paragraph>
              For a non-profit conference running in Southampton, I developed a
              website where delegates could reserve and pay for tickets. The
              website also allowed us to collect information needed from
              delegates, and a QR-code based ticket system was implemented to
              quickly register delegates when arriving at the conference.
              <br />
              <br />
              The stack was as follows: React front-end, Node backend, Redis DB,
              Stripe payment handling, Travis CI and Heroku deployment.
              <br />
              <br />
              The custom-built solution allowed us to sell nearly 120 tickets
              with lower fees than other event/ticket selling products, allowed
              delegates to manage their own tickets and enabled the conference
              committee to instantly admit users with valid tickets to the
              conference using a browser-based QR code scanner.
            </Paragraph>
          </SubSection>

          <SubSection name="Backpack">
            <Paragraph>
              <TextLink external href="https://backpack.github.io/">
                Backpack
              </TextLink>{' '}
              is Skyscanner's open-source design system which supports 4
              platforms (Android, iOS, React Native and Web). Our work which
              combines Design and Engineering in equal measures enables fast
              development and reduces effort duplication.
              <br />
              <br />A recent highlight has been delivering Skyscanner’s new
              brand across all our products, leveraging the coverage of Backpack
              libraries to enable seamless experimentation and roll-out across
              the entire ecosystem. And now we’re applying our learnings to
              rollout Dark Mode support too. 🎉
            </Paragraph>
            <br />
            <Button
              className={getClassName('pages__component--upper-margin')}
              hrefExternal
              href="https://backpack.github.io/"
            >
              Read more about Backpack here →
            </Button>
          </SubSection>

          <SubSection name="Software Engineering Masters">
            <Paragraph>
              I have a 1st class Masters in Software Engineering from the
              University of Southampton.
            </Paragraph>
            <Button
              className={getClassName('pages__component--upper-margin')}
              href="/work/degree"
            >
              Information about my degree →
            </Button>
          </SubSection>

          <SubSection name="EWOS">
            <Paragraph>
              In 2015, I joined the EWOS (Electronic Warfare Operational
              Support) team at{' '}
              <TextLink
                href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
                external
              >
                Leonardo
              </TextLink>
              . My work there involved maintaining large .NET frameworks which
              supported feature-rich mission analysis tools. Close collaboration
              with the hardware team and our consumers was essential and
              demanded a strong, agile approach to development. Thorough
              planning, in which we were all involved, was key to our success.
              Throughout some 60 weeks there, I immensely improved my ability to
              navigate large codebases and to produce readable, manageable code
              myself.
            </Paragraph>
          </SubSection>
        </Section>
      </div>
    );
  }
}
