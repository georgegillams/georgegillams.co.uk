import React from 'react';
import { Paragraph } from '@george-gillams/components/Paragraph';
import { Image } from '@george-gillams/components/Image';
import { Subsection } from '@george-gillams/components/Subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

import screenshot1 from './images/1.png';
import screenshot2 from './images/2.png';
import screenshot3 from './images/3.png';
import screenshot4 from './images/4.png';

import STYLES from './epicc.scss';

const getClassName = cssModules(STYLES);

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
      <div className={getClassName('epicc__gallery')}>
        <Image
          className={getClassName('epicc__screenshot')}
          imgProps={{
            alt: 'The EPICC conference ticket home page showing available tickets and their prices.',
          }}
          aspectX={1137}
          aspectY={1152}
          lightSrc={screenshot1}
          darkSrc={screenshot1}
        />
        <Image
          className={getClassName('epicc__screenshot')}
          imgProps={{
            alt:
              // eslint-disable-next-line max-len
              'The EPICC conference ticket website showing a user their ticket reservation and asking for their registration details.',
          }}
          aspectX={1137}
          aspectY={1113}
          lightSrc={screenshot2}
          darkSrc={screenshot2}
        />
        <Image
          className={getClassName('epicc__screenshot')}
          imgProps={{
            alt: 'The EPICC conference ticket website payment page.',
          }}
          aspectX={1137}
          aspectY={1196}
          lightSrc={screenshot3}
          darkSrc={screenshot3}
        />
        <Image
          className={getClassName('epicc__screenshot')}
          imgProps={{
            alt: 'The EPICC conference ticket website showing a user their purchased ticket.',
          }}
          aspectX={1137}
          aspectY={810}
          lightSrc={screenshot4}
          darkSrc={screenshot4}
        />
      </div>
    </Subsection>
  </PageTitle>
);

export default WorkEPICC;
