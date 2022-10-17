import React from 'react';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import Image from '@george-gillams/components/image';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import backpackOfferingDark from './images/backpackOfferingDark.png';
import backpackOfferingLight from './images/backpackOfferingLight.png';
import darkMode from './images/darkMode.png';
import brandLight from './images/brandLight.png';
import brandDark from './images/brandDark.png';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { withScrollAnimation } from '@george-gillams/components/effects';

const SubsectionWithScroll = withScrollAnimation(Subsection);
const ParagraphWithScroll = withScrollAnimation(Paragraph);

const WorkBackpack = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle link={{ to: '/work', text: 'Work' }} name="Backpack">
      <ParagraphWithScroll>
        <TextLink hrefExternal href="https://backpack.github.io/">
          Backpack
        </TextLink>{' '}
        is Skyscanner&#39;s open-source design system which supports 4 platforms (Android, iOS, React Native and Web). I
        spent 4 years working on the Web and native iOS offering, combining Design and Engineering in equal measures
        enables fast development and reduce effort duplication.
        <br />
        <br />
        During my time at Skyscanner I led a number of technical initiatives to improve the accessibility of the design
        system, and worked closely with the accessibility lead to embed accessibility into our design and engineering
        culture.
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
      </ParagraphWithScroll>
      <SubsectionWithScroll name="Brand refresh">
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
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Dark mode">
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
      </SubsectionWithScroll>
    </PageTitle>
  </PageContainer>
);

export default WorkBackpack;
