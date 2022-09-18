import React from 'react';

import Button from 'components/common/Button';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';

const getClassName = c => c;

const Work = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle name="Work">
      <Subsection name="Skyscanner">
        <Paragraph>
          <TextLink hrefExternal href="https://backpack.github.io/">
            Backpack
          </TextLink>{' '}
          is Skyscanner&#39;s open-source design system which supports 4 platforms (Android, iOS, React Native and Web).
          I spent 4 years working on the Web and native iOS offering, combining Design and Engineering in equal measures
          enables fast development and reduce effort duplication.
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
          tools.
        </Paragraph>
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
  </PageContainer>
);

export default Work;
