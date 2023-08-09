import React from 'react';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { withScrollAnimation } from '@george-gillams/components/effects';
import Button from '@george-gillams/components/button';
import { StyledImage, StyledSpartanTrifectaWedge } from './qualifications.styles';

import { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';

import TotalTypescriptCertificate1 from './images/total-typescript/1-certificate.png';
import TotalTypescriptCertificate2 from './images/total-typescript/2-certificate.png';
// import TotalTypescriptCertificate3 from './images/total-typescript/3-certificate.png';

import ProductPsychologyMasterclassCertificate from './images/product-psychology-masterclass-certificate.jpg';
import DiplomaPhotographyCertificate from './images/diploma-photography-certificate.jpg';

const SubsectionWithScroll = withScrollAnimation(Subsection);
const ParagraphWithScroll = withScrollAnimation(Paragraph);

const WorkQualifications = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle link={{ to: '/work', text: 'Work' }} name="Qualifications">
      <ParagraphWithScroll>
        As well as my <TextLink href="/work/degree">1st class Masters degree</TextLink> in Software Engineering, I have
        completed several other professional qualifications.
      </ParagraphWithScroll>
      <SubsectionWithScroll name="Drone Online Training">
        <Paragraph>
          I have completed training with both the{' '}
          <TextLink hrefExternal href="https://www.caa.co.uk/">
            UK Civil Aviation Authority
          </TextLink>{' '}
          and the{' '}
          <TextLink hrefExternal href="https://luftfartstilsynet.no/en/">
            Norwegian Civil Aviation Authority
          </TextLink>{' '}
          allowing me to fly drones in the Open A1 and Open A3 categories up to 25kg in weight in the UK and all{' '}
          <TextLink hrefExternal href="https://www.easa.europa.eu/">
            EASA
          </TextLink>{' '}
          member states.
        </Paragraph>
        <Paragraph>
          <Button href="/drone">See my drone IDs →</Button>
        </Paragraph>
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Spartan Obstacle Specialist Workshop">
        <Paragraph>
          I attended the first UK Spartan Obstacle Specialist Workshop, which works on varied techniques for overcoming
          typical Spartan obstacles in mixed conditions.
        </Paragraph>
        <StyledSpartanTrifectaWedge type={SPARTAN_EVENT_TYPE.obstacleSpecialistWorkshop} year={2022} />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Total TypeScript">
        <Paragraph>
          I have completed 2 professional workshops by{' '}
          <TextLink hrefExternal href="https://www.totaltypescript.com/workshops">
            Total TypeScript
          </TextLink>
          , which were exercise-driven, in-depth, and hands-on. The workshops have enabled me to apply my existing
          knowledge of Type Systems (from languages like Swift, Objective-C) to TypeScript codebases, allowing me to
          harness the full power of TypeScript wherever I work with it.
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: "Certificate of Completion of Total TypeScript's Type Transformation Workshop.",
          }}
          aspectX={1684}
          aspectY={1190}
          lightSrc={TotalTypescriptCertificate1.src}
          darkSrc={TotalTypescriptCertificate1.src}
        />
        <StyledImage
          imgProps={{
            alt: "Certificate of Completion of Total TypeScript's Generics Workshop.",
          }}
          aspectX={1684}
          aspectY={1190}
          lightSrc={TotalTypescriptCertificate2.src}
          darkSrc={TotalTypescriptCertificate2.src}
        />
        {/* <StyledImage
          imgProps={{
            alt: "Certificate of Completion of Total TypeScript's Advanced Patterns Workshop.",
          }}
          aspectX={1684}
          aspectY={1190}
          lightSrc={TotalTypescriptCertificate3.src}
          darkSrc={TotalTypescriptCertificate3.src}
        /> */}
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Product Psychology Masterclass">
        <Paragraph>
          I have completed growth.design&#39;s{' '}
          <TextLink hrefExternal href="https://growth.design/course">
            Product Psychology Masterclass
          </TextLink>
          , giving me tools to find gaps in products and create effective solutions based on proven psychology.
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: "Certificate of Completion of growth.design's Product Psychology Masterclass.",
          }}
          aspectX={2187}
          aspectY={1690}
          lightSrc={ProductPsychologyMasterclassCertificate.src}
          darkSrc={ProductPsychologyMasterclassCertificate.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Professional Diploma — Institute of Photography">
        <Paragraph>
          I have completed a Professional Diploma in Photography from the{' '}
          <TextLink hrefExternal href="https://www.institute-of-photography.com/">
            Institute of Photography
          </TextLink>
          . The CPD accredited course has formalised my existing knowledg and added to my technical understanding of
          photography. I am now a &quot;Qualified&quot; member of the{' '}
          <TextLink hrefExternal href="https://photoguild.co.uk/">
            Guild of Professional Photographers
          </TextLink>
          .
        </Paragraph>
        <StyledImage
          imgProps={{
            alt: 'Certificate of Completion of the Professional Diploma in Photography.',
          }}
          aspectX={2480}
          aspectY={3507}
          lightSrc={DiplomaPhotographyCertificate.src}
          darkSrc={DiplomaPhotographyCertificate.src}
        />
      </SubsectionWithScroll>
    </PageTitle>
  </PageContainer>
);

export default WorkQualifications;
