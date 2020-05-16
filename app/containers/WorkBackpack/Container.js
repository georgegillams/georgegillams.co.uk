import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

import { Button } from 'gg-components/Button';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class WorkBackpack extends Component {
  state = {};

  render() {
    return (
      <div className={getClassName('pages__container--prose')}>
        <Helmet title="Backpack" />
        <PageTitle link={{ to: '/work', text: 'Work' }} name="Backpack">
          <Paragraph>
            <TextLink external href="https://backpack.github.io/">
              Backpack
            </TextLink>{' '}
            is Skyscanner's open-source design system which supports 4 platforms
            (Android, iOS, React Native and Web). Our work which combines Design
            and Engineering in equal measures enables fast development and
            reduces effort duplication.
            <br />
            <br />
            I work mostly on iOS and web components, and occasionally do work to
            bridge components from native iOS to React Native.
            <br />
            <br />
          </Paragraph>
          <SubSection name="Brand refresh">
            <Paragraph>
              A highlight has been delivering Skyscanner’s new brand across all
              our products, leveraging the coverage of Backpack libraries to
              enable seamless experimentation and roll-out across the entire
              ecosystem. We made use of CSS variables for web and Appearance
              proxies for iOS) to allow us to swap "themes" at runtime. This
              allowed teams to test every part of their UI was responding to
              theming long before the new brand was finalised. When the new
              brand was signed off, we were able to easily add a new theme and
              control its rollout to users remotely.
              <br />
              <br />A colleague wrote a great{' '}
              <TextLink
                external
                href="https://medium.com/@SkyscannerEng/how-we-scaled-our-design-system-to-unleash-skyscanners-new-brand-845a1f501b0b"
              >
                blog about how we rolled out our new brand
              </TextLink>{' '}
              if you want to know more.
            </Paragraph>
          </SubSection>
          <SubSection name="Dark mode">
            <Paragraph>
              Leveraging some of the same techniques used to deliver the new
              brand, we recently rolled out Dark Mode support across iOS,
              Android and React Native. It was great to deliver such an
              important traveller-first feature as quickly as we managed too,
              and we used the opportunity to bake accessible colour contrast
              into the dark-mode designs. We also redefined our elevation
              language for both light and dark mode while we were at it to allow
              us to move as quickly as possible.
            </Paragraph>
          </SubSection>
        </PageTitle>
      </div>
    );
  }
}
