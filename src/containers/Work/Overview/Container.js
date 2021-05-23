import React from 'react';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import Button from 'components/common/Button';
import { Paragraph } from '@george-gillams/components/Paragraph';
import { Subsection } from '@george-gillams/components/Subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import STYLES from './work-overview.scss';

const getClassName = cssModules(STYLES);

const Work = () => (
  <div>
    <PageTitle name="Work">
      <Subsection name="Fundamentally open-source">
        <Paragraph>
          I believe that when we share, we all get more out of the code we write. That’s why I always prefer working on
          open-source projects.
        </Paragraph>
      </Subsection>

      <Subsection name="Skyscanner">
        <Paragraph>
          <TextLink hrefExternal href="https://backpack.github.io/">
            Backpack
          </TextLink>{' '}
          is Skyscanner&#39;s open-source design system which supports 4 platforms (Android, iOS, React Native and Web).
          Our work which combines Design and Engineering in equal measures enables fast development and reduces effort
          duplication.
        </Paragraph>
        <br />
        <Button className={getClassName('work-overview__component')} href="/work/backpack">
          My work in Backpack →
        </Button>
      </Subsection>

      <Subsection name="Software Engineering Masters">
        <Paragraph>I have a 1st class Masters in Software Engineering from the University of Southampton.</Paragraph>
        <br />
        <Button className={getClassName('work-overview__component')} href="/work/degree">
          My degree →
        </Button>
      </Subsection>

      <Subsection name="EPICC Conference">
        <Paragraph>
          EPICC is a non-profit conference for which I developed a website where delegates could reserve and pay for
          tickets.
        </Paragraph>
        <br />
        <Button className={getClassName('work-overview__component')} href="/work/epicc">
          Selling EPICC tickets →
        </Button>
      </Subsection>

      <Subsection name="Leonardo Company">
        <Paragraph>
          In 2015, I joined the EWOS (Electronic Warfare Operational Support) team at{' '}
          <TextLink href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support" hrefExternal>
            Leonardo
          </TextLink>
          . My work there involved maintaining large .NET frameworks which supported feature-rich mission analysis
          tools. Close collaboration with the hardware team and our consumers was essential and demanded a strong, agile
          approach to development. Thorough planning, in which we were all involved, was key to our success. Throughout
          some 60 weeks there, I immensely improved my ability to navigate large codebases and to produce readable,
          manageable code myself.
          <br />
          <br />
          Whilst working at Leonardo, I also got involved in a number of STEM activities. These included talking about
          industry opportunities at careers events, helping with local school projects, and delivering workshops.
        </Paragraph>
      </Subsection>

      <Subsection name="Side projects">
        <Paragraph>There&#39;s some other stuff I&#39;ve built over the years, including this website.</Paragraph>
        <br />
        <Button className={getClassName('work-overview__component')} href="/work/side-projects">
          My side projects →
        </Button>
      </Subsection>

      <Subsection name="Videography">
        <Paragraph>
          Before turning to Software Engineering, I was involved in professional film and TV production. From filming
          dance-shows to Weddings and University graduation ceremonies.
        </Paragraph>
      </Subsection>

      <Subsection name="Stage work">
        <Paragraph>
          I was involved in a number of stage performances. I was involved in Tosca at the Royal Opera House in 2008,
          and the Glyndebourne Carmen tour in 2009. I also sang in a modern-day adaptation of Handel&#39;s Semele in the
          Edinburgh Fringe Festival in 2017.
        </Paragraph>
      </Subsection>
    </PageTitle>
  </div>
);

export default Work;
