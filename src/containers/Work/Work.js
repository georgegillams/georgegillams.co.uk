import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Section, SubSection, TextLink, Button } from 'components';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists)
);

export default class Work extends Component {
  state = {
    showKitten: false
  };

  handleToggleKitten = () =>
    this.setState({ showKitten: !this.state.showKitten });

  render() {
    return (
      <div className={getClassName('pages__container')}>
        <Helmet title="Work" />
        <Section name="My Work">
          <SubSection name="Software Engineering Masters">
            I have a 1st class Masters in Software Engineering from the
            University of Southampton.
            <br />
            <br />
            <Button href="/work/degree">Information about my degree →</Button>
          </SubSection>
          <SubSection name="Work">
            I started my Software Engineering career at{" "}
            <TextLink
              href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
              external
            >
              Leonardo{" "}
            </TextLink>
            where I worked for 60 weeks, mostly on a .NET frameworks for
            analysis tools. The frameworks enabled other development teams
            within the company to build powerful applications for their
            products.
            <br />
            <br />I then moved on to become a Software Engineering intern at
            Skyscanner, where I still work on their open-source design system,{" "}
            <TextLink href="https://backpack.github.io/" external>
              Backpack{" "}
            </TextLink>
            . I continued this work whilst completing my Masters in Southampton,
            and then rejoined as a full-time graduate employee this summer.
          </SubSection>
          <Section name="Portfolio">
            This website demonstrates some of my web-development capabilities.
            Below I have included examples and extracts from my work on
            open-source products.
            <br />
            <br />
            <SubSection name="Backpack Design System">
              My first job at Skyscanner was in the{" "}
              <TextLink external href="https://backpack.github.io/">
                Backpack{" "}
              </TextLink>
              squad. By combining Design and Engineering, we meet our goal of
              providing support to other teams within the business, allowing
              them to quickly construct quality front-end products with
              coherence. We release{" "}
              <TextLink external href="https://npmjs.com/">
                NPM{" "}
              </TextLink>
              packages which allow users to consume our token values and{" "}
              <TextLink external href="https://reactjs.org/">
                React{" "}
              </TextLink>
              /
              <TextLink
                external
                href="https://facebook.github.io/react-native/"
              >
                React Native{" "}
              </TextLink>
              components. Our token values are available as{" "}
              <TextLink external href="http://sass-lang.com/">
                SASS{" "}
              </TextLink>
              mixins, Swift or Objective C code. Our transition to open-source
              happened soon after I joined Backpack making my initial placement
              particularly interesting.
              <br />
              <br />
              <TextLink external href="https://reactjs.org/">
                React{" "}
              </TextLink>
              components should really be stateless, meaning that often to
              create our working documentation pages we had to implement
              container components to hold state and allow interaction. This was
              time-consuming, and occasionally failed to reflect the real-life
              use-cases of our components. As a result, I decided to build a
              demo HOC which would allow any component to be passed in and
              automatically construct a list of props. Each prop can be edited
              in place through the Demo component.
              <br />
              <br />
              This is still a WIP, but a proof-of-concept is available to use.
              <br />
              <br />
              <Button href="/work/bpk-component-demo">
                See the demo component POC in action →
              </Button>
              <br />
              <br />
              <Button hrefExternal href="https://backpack.github.io/">
                Read more here →
              </Button>
            </SubSection>
            <SubSection name="Industrial Placement - EWOS, Leonardo">
              In 2015, I joined the EWOS (Electronic Warfare Operational
              Support) team at{" "}
              <TextLink
                href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
                external
              >
                Leonardo{" "}
              </TextLink>{" "}
              to experience the way in which the software teams work to deliver
              efficient and effective solutions. Our team was responsible for
              maintaining large .NET frameworks which supported feature-rich
              mission analysis tools. Close collaboration with the hardware team
              and customers was essential and demanded a strong, agile approach
              to development. Thorough planning, in which we were all involved,
              was key to our success. Throughout the year I immensely improved
              my ability to understand existing code and to produce readable,
              manageable code myself.
              <br />
              <br />I was heavily involved in STEM activities whilst working for
              the company.
            </SubSection>
            <SubSection name="Password Character Extractor">
              I found the login process for a number of sites (particularly UK
              bank websites) frustrating as they often require specific
              characters from a password or memorable word. This is something
              that LastPass cannot handle for me, so I created an offline tool
              to help.
              <br />
              <br />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="Password Character Extraction Use"
                style={{ maxWidth: '45rem' }}
                width={2224}
                height={514}
                src="https://i.imgur.com/jc8QRic.png"
              />
              <br />
              <br />
              <Button href="/apps/password-character-extractor">
                Read more here →
              </Button>
            </SubSection>
            <SubSection name="React.js Academic References Component">
              I was looking for a decent React Academic References Component{" "}
              <TextLink external href="https://npmjs.org/">
                NPM{" "}
              </TextLink>{" "}
              package and struggled to find one. I decided this is something
              bloggers could really do with, so I got on with implementing an
              open-source one.
              <br />
              <br />I started simple (Minimum Awesome Product) and hope that I /
              the OS community can expand on this to support more referencing
              formats.
              <br />
              <br />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="React.js Academic Reference Component Use"
                style={{ maxWidth: '45rem' }}
                width={2266}
                height={1728}
                src="https://i.imgur.com/7TmJg24.png"
              />
              <br />
              <br />
              <Button href="/blog/net-neutrality">See it in action →</Button>
              <br />
              <br />
              <Button
                hrefExternal
                href="https://github.com/georgegillams/react-component-academic-reference"
              >
                View on GitHub →
              </Button>
            </SubSection>
            <SubSection name="Greasemonkey - GuruShots">
              <TextLink
                href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/"
                external
              >
                GreaseMonkey{" "}
              </TextLink>
              is a brilliant browser extension that allows you to add javascript
              to specific webpages when they are loaded.{" "}
              <TextLink href="https://gurushots.com/" external>
                GuruShots{" "}
              </TextLink>
              is an online platform for photographers to enter their work into
              competitions. At a random point in each competition, each user is
              given a free boost. It is easy to miss, however, so I wrote a
              script to regularly check for free boosts and make them stand out
              on the page.
              <br />
              <br />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="Backpack component"
                style={{ maxWidth: '24rem' }}
                width={2910}
                height={1920}
                src="https://i.imgur.com/8tXCwHT.png"
              />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="Backpack component"
                style={{ maxWidth: '24rem' }}
                width={2952}
                height={1920}
                src="https://i.imgur.com/2wcCm16.png"
              />
              <br />
              <br />
              <Button href="/greasemonkey/gurushots_boost" hrefExternal>
                Download script
              </Button>
            </SubSection>
            <SubSection name="Greasemonkey - ECS">
              The ECS site we use at Southampton is a brilliant tool that was
              created ugly, so I wrote a GreaseMonkey script to… well… improve
              it.
              <br />
              <br />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="Backpack component"
                style={{ maxWidth: '24rem' }}
                width={2910}
                height={1920}
                src="https://i.imgur.com/zt3HvP1.png"
              />
              <FadingLazyLoadedImage
                className={getClassName('apps__image')}
                altText="Backpack component"
                style={{ maxWidth: '24rem' }}
                width={2952}
                height={1920}
                src="https://i.imgur.com/t6uFEMe.png"
              />
              <br />
              <br />
              <Button href="/greasemonkey/secureEcs_download" hrefExternal>
                Download script
              </Button>
            </SubSection>
            {/* <SubSection name="React Photo Gallery">
            I wanted to use an image gallery similar to the macOS Photo Wall
            screensaver, but no one has done anything similar. Following my work
            on{' '}
            <TextLink external hreh="https://backpack.github.io/">
              Backpack
            </TextLink>{' '}
            Lazy-Loaded images, I thought I'd give this a go! The result can be
            seen on my about page, or on the product page below.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Backpack component"
              style={{ width: '25rem' }}
              width={1}
              height={1}
              src={mozillaScreenshot}
            />
            <br />
            <Button
              onClick={() => window.location.replace('/work/react-photo-wall')}
            >
              Read more here →
            </Button>
          </SubSection>
          <SubSection name="Mozilla">
            Mozilla support rights on the internet. They stand up for our
            freedom to say what we want online at a time when many Governments
            and organisations want to control the content we create and access
            online. They also enforce web standards and principles which keep
            the internet a level playing-field, which ensures that the internet
            will continue to imrpove our lives, rather than becomming a
            political or commercial tool.
            <br />
            <br />
            As a result, I believe that Mozilla's work as a charity is
            absolutely vital for the future of the internet, and I believe that
            their browser-market share with Firefox is significant, as small as
            it may be.
            <br />
            <br />
            By contributing to Mozilla's open-source (and by donating to them
            every month) I am doing my bit to help them fight for our rights
            online.
            <br />
            <br />
            Below is an extract from something I worked on! ....
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Backpack component"
              style={{ width: '25rem' }}
              width={1}
              height={1}
              src={mozillaScreenshot}
            />
            <br />
            <Button
              onClick={() => {
                window.open('404-not-found', '_blank');
              }}
            >
              Read more here →
            </Button>
          </SubSection> */}
          </Section>
        </Section>
      </div>
    );
  }
}
