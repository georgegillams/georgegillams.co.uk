import React from 'react';

import Section from '@george-gillams/components/section';
import PageTitle from 'components/common/PageTitle';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import ukCaaFlyerId from './uk-caa-proof-of-online-training.png';
import norwayCaaCompetency from './norway-caa-proof-of-online-training.png';
import { StyledImage } from './drone.styles';
import Paragraph from '@george-gillams/components/paragraph/paragraph';

const Contact = () => {
  return (
    <PageContainer width={WIDTHS.default} bottomPadding>
      <PageTitle name="Drone">
        <Section name="Proof of completion of online training">
          <StyledImage lightSrc={ukCaaFlyerId.src} darkSrc={ukCaaFlyerId.src} aspectX={1916} aspectY={1354} />
          <StyledImage
            lightSrc={norwayCaaCompetency.src}
            darkSrc={norwayCaaCompetency.src}
            aspectX={2098}
            aspectY={1384}
          />
        </Section>
        <Section name="Operator ID">
          <Paragraph>UK CAA Operator ID: GBR-OP-267ZQHMWPYGR — expires 8 March 2024</Paragraph>
          <Paragraph>Norwegian CAA Operator ID: NOR5p8cfumh4phal — expires 8 March 2024</Paragraph>
        </Section>
        <Section name="Public Liability Insurance">
          <Paragraph>
            Insured Worldwide by Starr International (Europe) Limited (SIEL) to own and operate of Unmanned Aerial
            Systems (UAS) — expires 8 March 2024.
          </Paragraph>
        </Section>
      </PageTitle>
    </PageContainer>
  );
};

export default Contact;
