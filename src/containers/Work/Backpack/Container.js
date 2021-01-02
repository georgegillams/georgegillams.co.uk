import React from 'react';
import { Paragraph } from 'gg-components/Paragraph';
import { Subsection } from 'gg-components/Subsection';
import { Image } from 'gg-components/Image';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import backpackOfferingDark from './images/backpackOfferingDark.png';
import backpackOfferingLight from './images/backpackOfferingLight.png';
import darkMode from './images/darkMode.png';
import brandLight from './images/brandLight.png';
import brandDark from './images/brandDark.png';

const WorkBackpack = () => (
  <div>
    <PageTitle link={{ to: '/work', text: 'Work' }} name="Backpack">
      <Paragraph>
        <TextLink hrefExternal href="https://backpack.github.io/">
          Backpack
        </TextLink>{' '}
        is Skyscanner&#39;s open-source design system which supports 4 platforms (Android, iOS, React Native and Web).
        Our work which combines Design and Engineering in equal measures enables fast development and reduces effort
        duplication.
        <br />
        <br />
        I work mostly on iOS and web components, and occasionally do work to bridge components from native iOS to React
        Native.
        <br />
        <br />
        <Image
          imgProps={{
            alt:
              // eslint-disable-next-line max-len
              'Screenshots of Backpack accessibility documentation, the bar chart component for iOS, and the flare component for web.',
          }}
          aspectX={3258}
          aspectY={1986}
          lightSrc={backpackOfferingLight}
          darkSrc={backpackOfferingDark}
        />
      </Paragraph>
      <Subsection name="Brand refresh">
        <Paragraph>
          A highlight has been delivering Skyscanner’s new brand across all our products, leveraging the coverage of
          Backpack libraries to enable seamless experimentation and roll-out across the entire ecosystem. We made use of
          CSS variables for web and Appearance proxies for iOS) to allow us to swap &quot;themes&quot; at runtime. This
          allowed teams to test every part of their UI was responding to theming long before the new brand was
          finalised. When the new brand was signed off, we were able to easily add a new theme and control its rollout
          to users remotely.
          <br />
          <br />A colleague wrote a great{' '}
          <TextLink
            hrefExternal
            href="https://medium.com/@SkyscannerEng/how-we-scaled-our-design-system-to-unleash-skyscanners-new-brand-845a1f501b0b">
            blog about how we rolled out our new brand
          </TextLink>{' '}
          if you want to know more.
        </Paragraph>
        <br />
        <br />
        <Image
          imgProps={{
            alt: 'Screenshots of the Skyscanner app sporting the new brand.',
          }}
          aspectX={3248}
          aspectY={1986}
          lightSrc={brandLight}
          darkSrc={brandDark}
        />
      </Subsection>
      <Subsection name="Dark mode">
        <Paragraph>
          Leveraging some of the same techniques used to deliver the new brand, we recently rolled out Dark Mode support
          across iOS, Android and React Native. It was great to deliver such an important traveller-first feature as
          quickly as we managed too, and we used the opportunity to bake accessible colour contrast into the dark-mode
          designs. We also redefined our elevation language for both light and dark mode while we were at it to allow us
          to move as quickly as possible.
        </Paragraph>
        <br />
        <br />
        <Image
          imgProps={{
            alt:
              // eslint-disable-next-line max-len
              'Screenshots of Backpack accessibility documentation, the bar chart component for iOS, and the flare component for web.',
          }}
          aspectX={3368}
          aspectY={1986}
          lightSrc={darkMode}
          darkSrc={darkMode}
        />
      </Subsection>
    </PageTitle>
  </div>
);

export default WorkBackpack;
