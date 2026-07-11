import React from 'react';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { withScrollAnimation } from '@george-gillams/components/effects';
import { StyledImage } from './projects.styles';

import contraster from './images/contraster.png';
import chorder from './images/chorder.png';
import hyroxRelayPlanner from './images/hyroxRelayPlanner.png';
import isItHappyHourLight from './images/isItHappyHourLight.png';
import isItHappyHourDark from './images/isItHappyHourDark.png';

const SubsectionWithScroll = withScrollAnimation(Subsection);
const ParagraphWithScroll = withScrollAnimation(Paragraph);

const WorkProjects = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle link={{ to: '/work', text: 'Work' }} name="Projects">
      <ParagraphWithScroll>
        Alongside my day job I build personal apps and sites — small tools that scratch an itch or help with something I
        care about.
      </ParagraphWithScroll>
      <SubsectionWithScroll name="Contraster">
        <Paragraph>
          <TextLink hrefExternal href="https://apps.apple.com/gb/app/contraster/id6464116077?mt=12">
            Contraster
          </TextLink>{' '}
          — a macOS app for quickly checking colour contrast.
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: 'Contraster picking colours from a webpage and showing WCAG contrast results.',
          }}
          aspectX={1024}
          aspectY={640}
          lightSrc={contraster.src}
          darkSrc={contraster.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Chorder">
        <Paragraph>
          <TextLink hrefExternal href="https://github.com/georgegillams/software-chording-keyboard#download">
            Chorder
          </TextLink>{' '}
          — a macOS app for quickly typing chords.
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: 'Chorder showing a list of keyboard chords and their text expansions.',
          }}
          aspectX={1024}
          aspectY={640}
          lightSrc={chorder.src}
          darkSrc={chorder.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Hyrox Relay Planner">
        <Paragraph>
          <TextLink hrefExternal href="https://hyroxrelayplanner.com">
            hyroxrelayplanner.com
          </TextLink>{' '}
          — a site for planning the optimal arrangement for your Hyrox relay team.
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: 'Hyrox Relay Planner homepage with a call to create a team and three planning steps.',
          }}
          aspectX={1024}
          aspectY={725}
          lightSrc={hyroxRelayPlanner.src}
          darkSrc={hyroxRelayPlanner.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Is It Happy Hour?">
        <Paragraph>
          <TextLink hrefExternal href="https://isithappyhour.net">
            isithappyhour.net
          </TextLink>{' '}
          — shows you where in the world it&#39;s happy hour!
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: "isithappyhour.net showing that it's happy hour where you are.",
          }}
          aspectX={1024}
          aspectY={717}
          lightSrc={isItHappyHourLight.src}
          darkSrc={isItHappyHourDark.src}
        />
      </SubsectionWithScroll>
    </PageTitle>
  </PageContainer>
);

export default WorkProjects;
