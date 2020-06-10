import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Button } from 'gg-components/Button';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Work = () => (
  <div className={getClassName('pages__container--prose')}>
    <Helmet title="Work" />
    <PageTitle name="Work">
      <SubSection name="Fundamentally open-source">
        <Paragraph>
          I believe that when we share, we all get more out of the code we
          write. That’s why I always prefer working on open-source projects.
        </Paragraph>
      </SubSection>

      <SubSection name="Backpack">
        <Paragraph>
          <TextLink external href="https://backpack.github.io/">
            Backpack
          </TextLink>{' '}
          is Skyscanner's open-source design system which supports 4 platforms
          (Android, iOS, React Native and Web). Our work which combines Design
          and Engineering in equal measures enables fast development and reduces
          effort duplication.
        </Paragraph>
        <br />
        <Button
          className={getClassName('pages__component--upper-margin')}
          href="/work/backpack"
        >
          My work in Backpack →
        </Button>
      </SubSection>

      <SubSection name="Software Engineering Masters">
        <Paragraph>
          I have a 1st class Masters in Software Engineering from the University
          of Southampton.
        </Paragraph>
        <br />
        <Button
          className={getClassName('pages__component--upper-margin')}
          href="/work/degree"
        >
          My degree →
        </Button>
      </SubSection>

      <SubSection name="EPICC Conference">
        <Paragraph>
          EPICC is a non-profit conference for which I developed a website where
          delegates could reserve and pay for tickets.
        </Paragraph>
        <br />
        <Button
          className={getClassName('pages__component--upper-margin')}
          href="/work/epicc"
        >
          Selling EPICC tickets →
        </Button>
      </SubSection>

      <SubSection name="EWOS">
        <Paragraph>
          In 2015, I joined the EWOS (Electronic Warfare Operational Support)
          team at{' '}
          <TextLink
            href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
            external
          >
            Leonardo
          </TextLink>
          . My work there involved maintaining large .NET frameworks which
          supported feature-rich mission analysis tools. Close collaboration
          with the hardware team and our consumers was essential and demanded a
          strong, agile approach to development. Thorough planning, in which we
          were all involved, was key to our success. Throughout some 60 weeks
          there, I immensely improved my ability to navigate large codebases and
          to produce readable, manageable code myself.
        </Paragraph>
      </SubSection>

      <SubSection name="Side projects">
        <Paragraph>
          There's some other stuff I've built over the years, including this
          website.
        </Paragraph>
        <br />
        <Button
          className={getClassName('pages__component--upper-margin')}
          href="/work/side-projects"
        >
          My side projects →
        </Button>
      </SubSection>
    </PageTitle>
  </div>
);

export default Work;
