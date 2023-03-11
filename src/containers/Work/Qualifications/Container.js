import React from 'react';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { withScrollAnimation } from '@george-gillams/components/effects';
import Button from '@george-gillams/components/button';

const SubsectionWithScroll = withScrollAnimation(Subsection);
const ParagraphWithScroll = withScrollAnimation(Paragraph);

const WorkQualifications = () => (
  <PageContainer width={WIDTHS.prose} bottomPadding>
    <PageTitle link={{ to: '/work', text: 'Work' }} name="Qualifications">
      <ParagraphWithScroll>
        As well as my <TextLink href="/work/degree">1st class Masters degree</TextLink> in Software Engineering, I have
        completed several other professional qualifications.
      </ParagraphWithScroll>
      <SubsectionWithScroll name="Drone Certificate of Competence">
        <Paragraph>
          I have completed training with both the{' '}
          <TextLink hrefExternal href="https://www.caa.co.uk/">
            UK Civil Aviation Authority
          </TextLink>{' '}
          and the{' '}
          <TextLink hrefExternal href="https://luftfartstilsynet.no/en/">
            Norwegian Civil Aviation Authority
          </TextLink>{' '}
          allowing me to fly drones up to 25kg in weight in the UK and all{' '}
          <TextLink hrefExternal href="https://www.easa.europa.eu/">
            EASA
          </TextLink>{' '}
          member states.
        </Paragraph>
        <Paragraph>
          <Button href="/drone">See my drone IDs →</Button>
        </Paragraph>
      </SubsectionWithScroll>
      {/* <SubsectionWithScroll name="Photography Diploma — IOP">
        <Paragraph>
          I have completed a Professional Diploma in Photography from the{' '}
          <TextLink hrefExternal href="https://www.institute-of-photography.com/">
            Institute of Photography
          </TextLink>
          . The CPD accredited course has formalised what I learned in the past, whilst adding to my technical
          understanding of photography. As a result, I have now earned "Qualified" status within the{' '}
          <TextLink hrefExternal href="https://photoguild.co.uk/">
            Guild of Professional Photographers
          </TextLink>
          .
        </Paragraph>
        <Image
          imgProps={{
            alt: 'Screenshots of the Skyscanner app sporting the new brand.',
          }}
          aspectX={3248}
          aspectY={1986}
          lightSrc={brandLight.src}
          darkSrc={brandDark.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Total TypeScript">
        <Paragraph>
          I have completed{' '}
          <TextLink hrefExternal href="https://www.totaltypescript.com/workshops">
            Total TypeScript&#39;s
          </TextLink>{' '}
          professional workshops, which are exercise-driven, in-depth, and hands-on. The workshops have allowed me to
          apply my existing knowledge of Type Systems (from languages like Swift, Objective-C) to TypeScript codebases,
          allowing me to harness the full power of TypeScript wherever I work with it.
        </Paragraph>
        <Image
          imgProps={{
            alt: 'Screenshots of the Skyscanner app sporting the new brand.',
          }}
          aspectX={3248}
          aspectY={1986}
          lightSrc={brandLight.src}
          darkSrc={brandDark.src}
        />
      </SubsectionWithScroll>
      <SubsectionWithScroll name="Product Psychology Masterclass">
        <Paragraph>
          I have completed growth.design&#39;s{' '}
          <TextLink hrefExternal href="https://growth.design/course">
            Product Psychology Masterclass
          </TextLink>
          .
        </Paragraph>
        <Image
          imgProps={{
            alt: 'Screenshots of the Skyscanner app sporting the new brand.',
          }}
          aspectX={3248}
          aspectY={1986}
          lightSrc={brandLight.src}
          darkSrc={brandDark.src}
        />
      </SubsectionWithScroll> */}
    </PageTitle>
  </PageContainer>
);

export default WorkQualifications;
