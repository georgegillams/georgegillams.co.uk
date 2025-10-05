import Section from '@george-gillams/components/section';
import Subsection from '@george-gillams/components/subsection';
import PageTitle from 'components/common/PageTitle';
import React from 'react';

import { notBlack } from '@george-gillams/components/constants/colors';
import { withScrollAnimation } from '@george-gillams/components/effects';
import EventPatch from '@george-gillams/components/event-patch';
import SpartanMedal, { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';
import ToughMudderPatch, { PATCH_TYPE as TM_PATCH_TYPE } from '@george-gillams/components/tough-mudder-patch';
import PageContainer from 'components/common/PageContainer';
import { StyledMedalShelf } from './container.styles';
const SectionWithScroll = withScrollAnimation(Section);
const HYROX_YELLOW = '#ffed00';

// type TSpartanMedal = {
//   type: ComponentProps<typeof SpartanMedal>['type'];
//   year: string;
//   stravaId?: string;
// };

// type TEventMedal = {
//   background: string;
//   foreground: string;
//   title: string;
//   year: string;
//   stravaId?: string;
//   showDarkModeOutline?: boolean;
// };

// type THyroxMedal = {
//   location: string;
//   year: string;
//   stravaId?: string;
// };

// type TToughMudderMedal = {
//   type: ComponentProps<typeof ToughMudderPatch>['type'];
//   year: ComponentProps<typeof ToughMudderPatch>['year'];
//   stravaId?: string;
// };

const SpartanMedals = [
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2022',
    stravaId: '7297440877',
  },
  {
    type: SPARTAN_EVENT_TYPE.super,
    year: '2022',
    stravaId: '7484273069',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2022',
    stravaId: '7931592133',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2023',
    stravaId: '8976887050',
  },
  {
    type: SPARTAN_EVENT_TYPE.super,
    year: '2023',
    stravaId: '8982453371',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2023',
    stravaId: '8985253651',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2023',
    stravaId: '9368079066',
  },
  {
    type: SPARTAN_EVENT_TYPE.super,
    year: '2023',
    stravaId: '9373279956',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2023',
    stravaId: '9374858529',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2023',
    stravaId: '9639423217',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2023',
    stravaId: '9992819542',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2024',
    stravaId: '11383917878',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2024',
    stravaId: '11767286534',
  },
  {
    type: SPARTAN_EVENT_TYPE.super,
    year: '2024',
    stravaId: '11772961887',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2024',
    stravaId: '12117240459',
  },
  {
    type: SPARTAN_EVENT_TYPE.super,
    year: '2025',
    stravaId: '14516103526',
  },
  {
    type: SPARTAN_EVENT_TYPE.beast,
    year: '2025',
    stravaId: '15487773958',
  },
  {
    type: SPARTAN_EVENT_TYPE.sprint,
    year: '2025',
    stravaId: '15490608121',
  },
  {
    type: SPARTAN_EVENT_TYPE.ultra,
    year: '2025',
    stravaId: '16032950353',
  },
];

const OtherOcrMedals = [
  {
    background: notBlack,
    foreground: '#FFF200',
    title: 'Nuclear Rush 12km',
    year: '2023',
    stravaId: '9070888539',
    showDarkModeOutline: true,
  },
  {
    background: '#636363',
    foreground: '#FFE342',
    title: 'Bestial T-Rex 12km',
    year: '2023',
    stravaId: '10353677047',
  },
  {
    background: notBlack,
    foreground: '#F80F11',
    title: 'Tartan Warrior 8km',
    year: '2024',
    stravaId: '11027300530',
    showDarkModeOutline: true,
  },
  {
    background: notBlack,
    foreground: '#FFF200',
    title: 'Nuclear Challenge Cup 15km',
    year: '2024',
    stravaId: '11391838834',
    showDarkModeOutline: true,
  },
  {
    background: '#FFFFFF',
    foreground: '#088544',
    title: 'OCREC Short Course',
    year: '2024',
    stravaId: '11650394161',
  },
  {
    background: '#FFFFFF',
    foreground: '#088544',
    title: 'OCREC Standard Course',
    year: '2024',
    stravaId: '11657867054',
  },
  {
    background: notBlack,
    foreground: 'white',
    title: 'British Championships at Spartan',
    year: '2024',
    stravaId: '11765215916',
    showDarkModeOutline: true,
  },
  {
    background: notBlack,
    foreground: '#F80F11',
    title: 'Tartan Warrior 3km',
    year: '2025',
    stravaId: '14019004561',
    showDarkModeOutline: true,
  },
  {
    background: notBlack,
    foreground: '#FFF200',
    title: 'Nuclear OCR British Championships',
    year: '2025',
    stravaId: '14433973136',
    showDarkModeOutline: true,
  },
  {
    background: '#FFFFFF',
    foreground: '#088544',
    title: 'OCREC Short Course',
    year: '2025',
    stravaId: '14932741308',
  },
  {
    background: '#FFFFFF',
    foreground: '#088544',
    title: 'OCREC Standard Course',
    year: '2025',
    stravaId: '14942993521',
  },
  {
    background: '#636363',
    foreground: '#FFE342',
    title: 'Bestial T-Rex 12km',
    year: '2025',
    stravaId: '15715686188',
  },
  {
    background: '#162F4B',
    foreground: '#FFCA05',
    title: 'OCRWC Short Course',
    year: '2025',
    stravaId: '15787124939',
  },
  {
    background: '#162F4B',
    foreground: '#FFCA05',
    title: 'OCRWC Standard Course',
    year: '2025',
    stravaId: '15797792972',
  },
];

const HyroxMedals = [
  {
    location: 'London',
    year: '2023',
    stravaId: '10281041890',
  },
  {
    location: 'Katowice Doubles',
    year: '2024',
    stravaId: '10824673603',
  },
  {
    location: 'Katowice Relay',
    year: '2024',
    stravaId: '10829008206',
  },
  {
    location: 'Stockholm',
    year: '2024',
    stravaId: '13063999212',
  },
];

const RunningMedals = [
  {
    background: '#93D50A',
    foreground: notBlack,
    title: 'New Forest Half Marathon',
    year: '2022',
    stravaId: '7790895383',
  },
  {
    background: '#F04400',
    foreground: 'white',
    title: 'New Forest Half Marathon',
    year: '2023',
    stravaId: '8427549008',
  },
  {
    background: '#93D50A',
    foreground: notBlack,
    title: 'New Forest Half Marathon',
    year: '2023',
    stravaId: '9821124828',
  },
  {
    background: '#8358B9',
    foreground: 'white',
    title: 'RunThrough Southampton 10km',
    year: '2025',
    stravaId: '13640778020',
  },
];

const TrekMedals = [
  {
    background: '#0D313D',
    foreground: '#CE9708',
    title: 'Trekfest 50km',
    year: '2017',
    stravaId: '1019627751',
  },
  {
    background: '#0D492C',
    foreground: 'white',
    title: 'Chiltern 50km Ultra Challenge',
    year: '2022',
    stravaId: '7859623082',
  },
];

const ToughMudderMedals = [
  {
    type: TM_PATCH_TYPE.eventFull,
    year: '2016',
    stravaId: '787876867',
  },
  {
    type: TM_PATCH_TYPE.eventHalf,
    year: '2016',
    stravaId: '787876472',
  },
  {
    type: TM_PATCH_TYPE.eventFull,
    year: '2017',
    stravaId: '973508848',
  },
  {
    type: TM_PATCH_TYPE.eventFull,
    year: '2017',
    stravaId: '998731470',
  },
  {
    type: TM_PATCH_TYPE.eventFull,
    year: '2018',
    stravaId: '1551224197',
  },
];

const Medals = () => {
  return (
    <PageContainer bottomPadding>
      {/* @ts-expect-error PageTitle not yet typed */}
      <PageTitle anchor={false} name="Races"></PageTitle>
      <SectionWithScroll name="Spartan">
        <Subsection>
          <StyledMedalShelf>
            {SpartanMedals.map((medal, index) => (
              <SpartanMedal
                key={`${index}-${medal.type}-${medal.year}`}
                type={medal.type}
                // @ts-expect-error year type is not correct in the component
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Other OCR">
        <Subsection>
          <StyledMedalShelf>
            {OtherOcrMedals.map((medal, index) => (
              <EventPatch
                key={`${index}-${medal.title}-${medal.year}`}
                background={medal.background}
                foreground={medal.foreground}
                title={medal.title}
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
                showDarkModeOutline={medal.showDarkModeOutline}
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="HYROX">
        <Subsection>
          <StyledMedalShelf>
            {HyroxMedals.map((medal, index) => (
              <EventPatch
                key={`${index}-${medal.location}-${medal.year}`}
                background="#000000"
                foreground={HYROX_YELLOW}
                title={`HYROX ${medal.location}`}
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
                showDarkModeOutline
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Running">
        <Subsection>
          <StyledMedalShelf>
            {RunningMedals.map((medal, index) => (
              <EventPatch
                key={`${index}-${medal.title}-${medal.year}`}
                background={medal.background}
                foreground={medal.foreground}
                title={medal.title}
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
                showDarkModeOutline={medal.showDarkModeOutline}
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Treks">
        <Subsection>
          <StyledMedalShelf>
            {TrekMedals.map((medal, index) => (
              <EventPatch
                key={`${index}-${medal.title}-${medal.year}`}
                background={medal.background}
                foreground={medal.foreground}
                title={medal.title}
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
                showDarkModeOutline={medal.showDarkModeOutline}
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Tough Mudder">
        <Subsection>
          <StyledMedalShelf>
            {ToughMudderMedals.map((medal, index) => (
              <ToughMudderPatch
                key={`${index}-${medal.type}-${medal.year}`}
                type={medal.type}
                year={medal.year}
                stravaLink={medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined}
              />
            ))}
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
    </PageContainer>
  );
};

export default Medals;
