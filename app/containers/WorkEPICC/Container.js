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

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class WorkEPICC extends Component {
  state = {};

  render() {
    return (
      <div className={getClassName('pages__container--prose')}>
        <Helmet title="EPICC" />
        <PageTitle link={{ to: '/work', text: 'Work' }} name="EPICC">
          <SubSection name="EPICC Conference">
            <Paragraph>
              <TextLink external href="http://www.epicc-conference.org/">
                EPICC
              </TextLink>{' '}
              is a non-profit conference run by student medics in Southampton.
              For their conference in 2019, I developed a website where
              delegates could reserve tickets for up to 1 hour and pay for them.
              The website also allowed us to collect information needed from
              delegates, and a QR-code based ticket system was implemented to
              quickly register delegates when arriving at the conference.
              <br />
              <br />
              The stack used: React on the front-end, a Node backend, Redis DB,
              Stripe payment handling, Travis CI and Heroku deployment.
              <br />
              <br />
              The custom-built solution allowed us to sell nearly 120 tickets
              with much lower fees than off-the-shelf products would have
              incurred. Delegates could sign in using a magic-link sent to their
              email and then manage their tickets online.
            </Paragraph>
          </SubSection>
        </PageTitle>
      </div>
    );
  }
}
