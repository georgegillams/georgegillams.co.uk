import React from 'react';
import { Paragraph } from 'gg-components/Paragraph';
import { Subsection } from 'gg-components/Subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

const WorkEPICC = () => (
  <PageTitle link={{ to: '/work', text: 'Work' }} name="EPICC">
    <Subsection name="EPICC Conference">
      <Paragraph>
        <TextLink hrefExternal href="http://www.epicc-conference.org/">
          EPICC
        </TextLink>{' '}
        is a non-profit conference run by student medics in Southampton. For their conference in 2019, I developed a
        website where delegates could reserve tickets for up to 1 hour and pay for them. The website also allowed us to
        collect information needed from delegates, and a QR-code based ticket system was implemented to quickly register
        delegates when arriving at the conference.
        <br />
        <br />
        The stack used: React on the front-end, a Node backend, Redis DB, Stripe payment handling, Travis CI and Heroku
        deployment.
        <br />
        <br />
        The custom-built solution allowed us to sell nearly 120 tickets with much lower fees than off-the-shelf products
        would have incurred. Delegates could sign in using a magic-link sent to their email and then manage their
        tickets online.
      </Paragraph>
    </Subsection>
  </PageTitle>
);

export default WorkEPICC;
