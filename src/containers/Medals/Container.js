import React from 'react';
import Section from '@george-gillams/components/section';
import Subsection from '@george-gillams/components/subsection';
import PageTitle from 'components/common/PageTitle';

import PageContainer from 'components/common/PageContainer';
import EventPatch from '@george-gillams/components/event-patch';
import ToughMudderPatch, { PATCH_TYPE as TM_PATCH_TYPE } from '@george-gillams/components/tough-mudder-patch';
import SpartanMedal, { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';
import { StyledMedalShelf } from './container.styles';
import { notBlack } from '@george-gillams/components/constants/colors';
import { withScrollAnimation } from '@george-gillams/components/effects';
const SectionWithScroll = withScrollAnimation(Section);
const HYROX_YELLOW = '#ffed00';

const Medals = () => {
  return (
    <PageContainer bottomPadding>
      <PageTitle anchor={false} name="Races"></PageTitle>
      <SectionWithScroll name="Spartan">
        <Subsection>
          <StyledMedalShelf>
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2022"
              stravaLink="https://www.strava.com/activities/7297440877"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.super}
              year="2022"
              stravaLink="https://www.strava.com/activities/7484273069"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.beast}
              year="2022"
              stravaLink="https://www.strava.com/activities/7931592133"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.beast}
              year="2023"
              stravaLink="https://www.strava.com/activities/8976887050"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.super}
              year="2023"
              stravaLink="https://www.strava.com/activities/8982453371"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2023"
              stravaLink="https://www.strava.com/activities/8985253651"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.beast}
              year="2023"
              stravaLink="https://www.strava.com/activities/9368079066"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.super}
              year="2023"
              stravaLink="https://www.strava.com/activities/9373279956"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2023"
              stravaLink="https://www.strava.com/activities/9374858529"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2023"
              stravaLink="https://www.strava.com/activities/9639423217"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.beast}
              year="2023"
              stravaLink="https://www.strava.com/activities/9992819542"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.beast}
              year="2024"
              stravaLink="https://www.strava.com/activities/11383917878"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2024"
              stravaLink="https://www.strava.com/activities/11767286534"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.super}
              year="2024"
              stravaLink="https://www.strava.com/activities/11772961887"
            />
            <SpartanMedal
              type={SPARTAN_EVENT_TYPE.sprint}
              year="2024"
              stravaLink="https://www.strava.com/activities/12117240459"
            />
          </StyledMedalShelf>
        </Subsection>
        {/* <Subsection anchor={false} name="Trifectas">
          <StyledMedalShelf>
            <SpartanTrifectaDisplay
              wedges={[SPARTAN_EVENT_TYPE.sprint, SPARTAN_EVENT_TYPE.super, SPARTAN_EVENT_TYPE.beast]}
              year="2022"
            />
            <SpartanTrifectaDisplay
              wedges={[SPARTAN_EVENT_TYPE.sprint, SPARTAN_EVENT_TYPE.super, SPARTAN_EVENT_TYPE.beast]}
              year="2023"
            />
            <SpartanTrifectaDisplay
              wedges={[SPARTAN_EVENT_TYPE.sprint, SPARTAN_EVENT_TYPE.super, SPARTAN_EVENT_TYPE.beast]}
              year="2023"
            />
            <SpartanTrifectaDisplay wedges={[SPARTAN_EVENT_TYPE.sprint, null, SPARTAN_EVENT_TYPE.beast]} year="2023" />
          </StyledMedalShelf>
        </Subsection>
        <Subsection anchor={false} name="Other wedges">
          <StyledMedalShelf>
            <SpartanTrifectaDisplay wedges={[SPARTAN_EVENT_TYPE.obstacleSpecialistWorkshop, null, null]} />
          </StyledMedalShelf>
        </Subsection> */}
      </SectionWithScroll>
      <SectionWithScroll name="Other OCR">
        <Subsection>
          <StyledMedalShelf>
            <EventPatch
              background={notBlack}
              foreground="#FFF200"
              title="Nuclear Rush 12km"
              year="2023"
              stravaLink="https://www.strava.com/activities/9070888539"
              showDarkModeOutline
            />
            <EventPatch
              background="#636363"
              foreground="#FFE342"
              title="Bestial T-Rex 12km"
              year="2023"
              stravaLink="https://www.strava.com/activities/10353677047"
            />
            <EventPatch
              background={notBlack}
              foreground="#F80F11"
              title="Tartan Warrior 8km"
              year="2024"
              stravaLink="https://www.strava.com/activities/11027300530"
              showDarkModeOutline
            />
            <EventPatch
              background={notBlack}
              foreground="#FFF200"
              title="Nuclear Challenge Cup 15km"
              year="2024"
              stravaLink="https://www.strava.com/activities/11391838834"
              showDarkModeOutline
            />
            <EventPatch
              background="#FFFFFF"
              foreground="#088544"
              title="OCREC Short Course"
              year="2024"
              stravaLink="https://www.strava.com/activities/11650394161"
            />
            <EventPatch
              background="#FFFFFF"
              foreground="#088544"
              title="OCREC Standard Course"
              year="2024"
              stravaLink="https://www.strava.com/activities/11657867054"
            />
            <EventPatch
              background={notBlack}
              foreground="white"
              title="British Championships"
              year="2024"
              stravaLink="https://www.strava.com/activities/11765215916"
              showDarkModeOutline
            />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="HYROX">
        <Subsection>
          <StyledMedalShelf>
            <EventPatch
              background="#000000"
              foreground={HYROX_YELLOW}
              title="HYROX London"
              year="2023"
              stravaLink="https://www.strava.com/activities/10281041890"
              showDarkModeOutline
            />
            <EventPatch
              background="#000000"
              foreground={HYROX_YELLOW}
              title="HYROX Katowice Doubles"
              year="2024"
              stravaLink="https://www.strava.com/activities/10824673603"
              showDarkModeOutline
            />
            <EventPatch
              background="#000000"
              foreground={HYROX_YELLOW}
              title="HYROX Katowice Relay"
              year="2024"
              stravaLink="https://www.strava.com/activities/10829008206"
              showDarkModeOutline
            />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Running">
        <Subsection>
          <StyledMedalShelf>
            <EventPatch
              background="#93D50A"
              foreground={notBlack}
              title="New Forest Half Marathon"
              year="2022"
              stravaLink="https://www.strava.com/activities/7790895383"
            />
            <EventPatch
              background="#F04400"
              foreground="white"
              title="New Forest Half Marathon"
              year="2023"
              stravaLink="https://www.strava.com/activities/8427549008"
            />
            <EventPatch
              background="#93D50A"
              foreground={notBlack}
              title="New Forest Half Marathon"
              year="2023"
              stravaLink="https://www.strava.com/activities/9821124828"
            />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Treks">
        <Subsection>
          <StyledMedalShelf>
            <EventPatch
              background="#0D313D"
              foreground="#CE9708"
              title="Trekfest 50km"
              year={2017}
              stravaLink="https://www.strava.com/activities/1019627751"
            />
            <EventPatch
              background="#0D492C"
              foreground="white"
              title="Chiltern 50km Ultra Challenge"
              year="2022"
              stravaLink="https://www.strava.com/activities/7859623082"
            />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Tough Mudder">
        <Subsection>
          <StyledMedalShelf>
            <ToughMudderPatch
              type={TM_PATCH_TYPE.eventFull}
              year={2016}
              stravaLink="https://www.strava.com/activities/787876867"
            />
            <ToughMudderPatch
              type={TM_PATCH_TYPE.eventHalf}
              year={2016}
              stravaLink="https://www.strava.com/activities/787876472"
            />
            <ToughMudderPatch
              type={TM_PATCH_TYPE.eventFull}
              year={2017}
              stravaLink="https://www.strava.com/activities/973508848"
            />
            <ToughMudderPatch
              type={TM_PATCH_TYPE.eventFull}
              year={2017}
              stravaLink="https://www.strava.com/activities/998731470"
            />
            <ToughMudderPatch
              type={TM_PATCH_TYPE.eventFull}
              year={2018}
              stravaLink="https://www.strava.com/activities/1551224197"
            />
          </StyledMedalShelf>
        </Subsection>
        {/* <Subsection anchor={false} name="Legionaire">
          <StyledMedalShelf>
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire2} />
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire3} />
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire456} />
          </StyledMedalShelf>
        </Subsection> */}
      </SectionWithScroll>
    </PageContainer>
  );
};

export default Medals;
