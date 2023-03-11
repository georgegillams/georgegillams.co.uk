import React from 'react';

import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { StyledButton } from './work-overview.styles';
import { withScrollAnimation } from '@george-gillams/components/effects';

const SubsectionWithScroll = withScrollAnimation(Subsection);

const Work = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle name="Work">
      <SubsectionWithScroll name="Courses and qualifications">
        <Paragraph>I have completed several courses and qualifications alongside my work.</Paragraph>
        <br />
        <StyledButton href="/work/qualifications">Qualifications →</StyledButton>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Typeform">
        <Paragraph>
          I maintain{' '}
          <TextLink href="https://www.typeform.com/" hrefExternal>
            Typeform&#39;s
          </TextLink>{' '}
          public sites, including{' '}
          <TextLink href="https://www.typeform.com/surveys/" hrefExternal>
            landing pages
          </TextLink>
          ,{' '}
          <TextLink href="https://www.typeform.com/blog/" hrefExternal>
            blogs
          </TextLink>
          ,{' '}
          <TextLink href="https://www.typeform.com/templates/" hrefExternal>
            templates
          </TextLink>
          ,{' '}
          <TextLink href="https://www.typeform.com/connect/" hrefExternal>
            integrations
          </TextLink>
          , and{' '}
          <TextLink href="https://www.typeform.com/signup/" hrefExternal>
            signup
          </TextLink>
          . They&#39;re built using React, Styled Components and Next.js. We have a strong focus on SEO, speed, and
          empowering content creators to deliver content/experiments with as little friction as possible.
        </Paragraph>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Skyscanner">
        <Paragraph>
          <TextLink hrefExternal href="https://backpack.github.io/">
            Backpack
          </TextLink>{' '}
          is Skyscanner&#39;s open-source design system which supports 4 platforms (Android, iOS, React Native and Web).
          I spent 4 years working on the Web and native iOS offering, combining Design and Engineering in equal measures
          enables fast development and reduce effort duplication.
        </Paragraph>
        <br />
        <StyledButton href="/work/backpack">My work in Backpack →</StyledButton>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Software Engineering Masters">
        <Paragraph>I have a 1st class Masters in Software Engineering from the University of Southampton.</Paragraph>
        <br />
        <StyledButton href="/work/degree">My degree →</StyledButton>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="EPICC Conference">
        <Paragraph>
          EPICC is a non-profit conference for which I developed a website where delegates could reserve and pay for
          tickets.
        </Paragraph>
        <br />
        <StyledButton href="/work/epicc">Selling EPICC tickets →</StyledButton>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Leonardo Company">
        <Paragraph>
          In 2015, I joined the EWOS (Electronic Warfare Operational Support) team at{' '}
          <TextLink href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support" hrefExternal>
            Leonardo
          </TextLink>
          . My work there involved maintaining large .NET frameworks which supported feature-rich mission analysis
          tools.
        </Paragraph>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Videography">
        <Paragraph>
          Before turning to Software Engineering, I was involved in professional film and TV production. From filming
          dance-shows to Weddings and University graduation ceremonies.
        </Paragraph>
      </SubsectionWithScroll>

      <SubsectionWithScroll name="Stage work">
        <Paragraph>
          I was involved in a number of stage performances. I was involved in Tosca at the Royal Opera House in 2008,
          and the Glyndebourne Carmen tour in 2009. I also sang in a modern-day adaptation of Handel&#39;s Semele in the
          Edinburgh Fringe Festival in 2017.
        </Paragraph>
      </SubsectionWithScroll>
    </PageTitle>
  </PageContainer>
);

export default Work;
