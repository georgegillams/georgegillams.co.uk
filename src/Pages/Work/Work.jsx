import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import SubSection from '../../components/SubSection';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';
import passwordCharacterExtractorUse from './images/passwordCharacterExtractorUse.png';
import greasemonkeyEcsBefore from './images/greasemonkey_before.png';
import greasemonkeyEcsAfter from './images/greasemonkey_after.png';

import STYLES from './apps.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const Work = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <br />
      <PageSwitchScroller />
      <Section name="My Work">
        <SubSection name="Where it all started">
          I started my Software Engineering career at{' '}
          <TextLink
            href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
            external
          >
            Leonardo{' '}
          </TextLink>
          where I worked for 60 weeks, mainly on a .NET analysis framework which
          supported other development teams in building powerful applications.
          <br />
          <br />
          I then moved on to become a Software Engineering intern at Skyscanner,
          where I worked on their open-source design system,{' '}
          <TextLink href="https://backpack.github.io/" external>
            Backpack{' '}
          </TextLink>. I continued this work whilst completing my Masters in
          Southampton. Once my Masters is out of the way, I will be rejoining
          Skyscanner as a full-time employee.
        </SubSection>
        <br />
        <Section name="Portfolio">
          This website demonstrates some of my web-development capabilities.
          Below I have included examples and extracts from my work on
          open-source products.
          <br />
          <br />
          <SubSection name="Backpack Design System">
            My first job at Skyscanner was in the{' '}
            <TextLink external href="https://backpack.github.io/">
              Backpack{' '}
            </TextLink>
            squad. By combining Design and Engineering, we meet our goal of
            providing support to other teams within the business, allowing them
            to quickly construct quality front-end products with coherence. We
            released{' '}
            <TextLink external href="https://npmjs.com/">
              NPM{' '}
            </TextLink>
            packages which allowed users to consume{' '}
            <TextLink external href="https://reactjs.org/">
              React{' '}
            </TextLink>
            components, or build their own using our{' '}
            <TextLink external href="http://sass-lang.com/">
              SASS{' '}
            </TextLink>
            mixins. Shortly after joining Backpack we went open-source, and then
            started supporting app-development through{' '}
            <TextLink external href="https://facebook.github.io/react-native/">
              React-Native{' '}
            </TextLink>. These two changes made my time with Backpack
            particularly interesting.
            <br />
            <br />
            <TextLink external href="https://reactjs.org/">
              React{' '}
            </TextLink>
            components should really be stateless, meaning that often to create
            our working documentation pages we had to implement container
            components to hold state and allow interaction. This was
            time-consuming, and occasionally failed to reflect the real-life
            use-cases of our components. As a result, I decided to build a demo
            HOC which would allow any component to be passed in, and would
            automatically construct a list of HOCS, allowing them to be edited
            through the Demo component.
            <br />
            <br />
            {/* <FadingLazyLoadedImage
              className={getClassName("apps__image")}
              altText="Backpack component"
              style={{ width: "45rem" }}
              width={478}
              height={169}
              src={backpackScreenshot}
            /> */}
            <br />
            <Button hrefExternal href="https://backpack.github.io/">
              Read more here →
            </Button>
          </SubSection>
          {/* <SubSection name="React.js Academic References Component">
            I was looking for a decent React Academic References Component{' '}
            <TextLink external href="https://npmjs.org/">
              NPM{' '}
            </TextLink>{' '}
            package and struggled to find one. I decided this is something
            bloggers could really do with, so I got on with implementing an
            open-source one.
            <br />
            <br />
            I started simple (Minimum Awesome Product) and hope that I / the OS
            community can expand on this to support more referencing formats.
            <br />
            <br />
            <Button href="blog/net-neutrality">See it in action →</Button>
            <br />
            <br />
            <Button
              hrefExternal
              href="https://github.com/georgegillams/react-component-academic-references"
            >
              View on GitHub →
            </Button>
          </SubSection> */}
          <SubSection name="Password Character Extractor">
            I found the login process for a number of sites (particularly UK
            bank websites) frustrating as they often require specific characters
            from a password or memorable word. This is something that LastPass
            cannot handle for me, so I created an offline tool to help.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Password Character Extraction Use"
              style={{ maxWidth: '45rem' }}
              width={2224}
              height={514}
              src={passwordCharacterExtractorUse}
            />
            <br />
            <br />
            <Button href="/apps/password-character-extractor">
              Read more here →
            </Button>
          </SubSection>
          <SubSection name="Greasemonkey">
            <TextLink
              href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/"
              external
            >
              GreaseMonkey{' '}
            </TextLink>
            is a brilliant browser extension that allows you to add javascript
            to specific webpages when they are loaded. The ECS site we use at
            Southampton is a brilliant tool that was created ugly, so I wrote a
            GreaseMonkey script to… well… improve it.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Backpack component"
              style={{ maxWidth: '24rem' }}
              width={2910}
              height={1920}
              src={greasemonkeyEcsBefore}
            />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Backpack component"
              style={{ maxWidth: '24rem' }}
              width={2952}
              height={1920}
              src={greasemonkeyEcsAfter}
            />
            <br />
            <Button href="/api/greasemonkey/secureEcs_download" hrefExternal>
              Donwload script
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
    </main>
  );
};

Work.propTypes = {
  className: PropTypes.string,
};

Work.defaultProps = {
  className: null,
};

export default Work;
