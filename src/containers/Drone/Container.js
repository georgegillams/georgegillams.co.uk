import React from 'react';

import Section from '@george-gillams/components/section';
import Subsection from '@george-gillams/components/subsection';
import PageTitle from 'components/common/PageTitle';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import ukCaaFlyerId from './uk-caa-proof-of-online-training.png';
import norwayCaaCompetency from './norway-caa-proof-of-online-training.png';
import { StyledImage } from './drone.styles';
import Paragraph from '@george-gillams/components/paragraph/paragraph';
import TextLink from 'components/common/TextLink';
import Button from 'components/common/Button';
import { BUTTON_SIZES } from '@george-gillams/components/button';
import { withScrollAnimation } from '@george-gillams/components/effects';
import { LOST_FOUND_FORM } from 'helpers/typeformConstants';

const SectionWithScroll = withScrollAnimation(Section);

const UK_TRAINING_EXPIRY = '8 March 2028';
const EASA_TRAINING_EXPIRY = '8 March 2028';
const UK_OPERATOR_ID_EXPIRY = '8 March 2026';
const EASA_OPERATOR_ID_EXPIRY = '16 August 2026';
const INSURANCE_EXPIRY = '8 March 2026';
const UK_FLYER_ID = 'GBR-RP-B88RNYQSNJ62';
const EASA_FLYER_ID = 'NOR-RP-4zb7de1751cj';
const UK_OPERATOR_ID = 'GBR-OP-267ZQHMWPYGR';
const EASA_OPERATOR_ID = 'NOR5p8cfumh4phal';

const Drone = () => {
  return (
    <PageContainer width={WIDTHS.default} bottomPadding>
      <PageTitle name="Drone">
        <SectionWithScroll name="Have you found a drone?">
          <Paragraph>
            Thank you! 🙏 Please tap the button below to fill in a form and get my drone back to me!
          </Paragraph>
          <br />
          <Paragraph>
            <Button size={BUTTON_SIZES.large} hrefExternal href={`${LOST_FOUND_FORM}#item=drone`}>
              I&#39;ve found your drone →
            </Button>
          </Paragraph>
        </SectionWithScroll>
        <SectionWithScroll name="Flight rules">
          <Paragraph>
            My drone weights &lt; 250g and falls into the Open A1 category. I have completed training that allows me me
            to fly drones in Open A1 and Open A3 categories.
          </Paragraph>
          <Subsection name="UK">
            <Paragraph>
              Read the{' '}
              <TextLink hrefExternal href="https://register-drones.caa.co.uk/drone-code/the_drone_code.pdf">
                UK Civil Aviation Authority Drone and Model Aircraft Code
              </TextLink>
            </Paragraph>
          </Subsection>
          <Subsection name="Spain">
            <Paragraph>
              Read the{' '}
              <TextLink
                hrefExternal
                href="https://www.seguridadaerea.gob.es/es/ambitos/drones/how-to-fly-a-uas-in-spain">
                Agencia Estatal De Seguridad Aerea (State air safety agency) UAS flying rules
              </TextLink>
            </Paragraph>
          </Subsection>
          <Subsection name="Norway">
            <Paragraph>
              Read the{' '}
              <TextLink hrefExternal href="https://luftfartstilsynet.no/en/drones/">
                Norwegian Civil Aviation Authority Drone Rules
              </TextLink>
            </Paragraph>
          </Subsection>
        </SectionWithScroll>
        <SectionWithScroll name="Proof of completion of online training">
          <Subsection name="UK">
            <StyledImage lightSrc={ukCaaFlyerId.src} darkSrc={ukCaaFlyerId.src} aspectX={1916} aspectY={1354} />
            <Paragraph>
              {UK_FLYER_ID} — expires {UK_TRAINING_EXPIRY}
            </Paragraph>
          </Subsection>
          <Subsection name="Norway and EASA member states">
            <StyledImage
              lightSrc={norwayCaaCompetency.src}
              darkSrc={norwayCaaCompetency.src}
              aspectX={2098}
              aspectY={1384}
            />
            <Paragraph>
              {EASA_FLYER_ID} — expires {EASA_TRAINING_EXPIRY}
            </Paragraph>
          </Subsection>
        </SectionWithScroll>
        <SectionWithScroll name="Operator ID">
          <Subsection name="UK"></Subsection>
          <Paragraph>
            {UK_OPERATOR_ID} — expires {UK_OPERATOR_ID_EXPIRY}
          </Paragraph>
          <Subsection name="Norway and EASA member states">
            <Paragraph>
              {EASA_OPERATOR_ID} — expires {EASA_OPERATOR_ID_EXPIRY}
            </Paragraph>
          </Subsection>
        </SectionWithScroll>
        <SectionWithScroll name="Public Liability Insurance">
          <Paragraph>
            Insured Worldwide by Starr International (Europe) Limited (SIEL) to own and operate Unmanned Aerial Systems
            (UAS) — expires {INSURANCE_EXPIRY}.
          </Paragraph>
        </SectionWithScroll>
      </PageTitle>
    </PageContainer>
  );
};

export default Drone;
