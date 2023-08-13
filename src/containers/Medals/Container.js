import React from 'react';
import Section from '@george-gillams/components/section';
import Subsection from '@george-gillams/components/subsection';
import PageTitle from 'components/common/PageTitle';

import PageContainer from 'components/common/PageContainer';
import EventPatch from '@george-gillams/components/event-patch';
import ToughMudderPatch, { PATCH_TYPE as TM_PATCH_TYPE } from '@george-gillams/components/tough-mudder-patch';
import SpartanMedal, { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';
import SpartanTrifectaDisplay from '@george-gillams/components/spartan-trifecta-display';
import { StyledMedalShelf } from './container.styles';
import { notBlack } from '@george-gillams/components/constants/colors';
import { withScrollAnimation } from '@george-gillams/components/effects';
const SectionWithScroll = withScrollAnimation(Section);

const Medals = () => {
  return (
    <PageContainer bottomPadding>
      <PageTitle anchor={false} name="Medals"></PageTitle>
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
        <Subsection anchor={false} name="Legionaire">
          <StyledMedalShelf>
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire2} />
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire3} />
            <ToughMudderPatch type={TM_PATCH_TYPE.legionnaire456} />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
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
          </StyledMedalShelf>
        </Subsection>
        <Subsection anchor={false} name="Trifectas">
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
            <SpartanTrifectaDisplay wedges={[SPARTAN_EVENT_TYPE.sprint, null, null]} year="2023" />
          </StyledMedalShelf>
        </Subsection>
        <Subsection anchor={false} name="Other wedges">
          <StyledMedalShelf>
            <SpartanTrifectaDisplay wedges={[SPARTAN_EVENT_TYPE.obstacleSpecialistWorkshop, null, null]} />
          </StyledMedalShelf>
        </Subsection>
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
            />
          </StyledMedalShelf>
        </Subsection>
      </SectionWithScroll>
      <SectionWithScroll name="Runs">
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
              background="#FF4E00"
              foreground="white"
              title="New Forest Half Marathon"
              year="2023"
              stravaLink="https://www.strava.com/activities/8427549008"
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
    </PageContainer>
  );
};

export default Medals;
