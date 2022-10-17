import React, { useState, useEffect } from 'react';

import Paragraph from '@george-gillams/components/paragraph';
import Section from '@george-gillams/components/section';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import { StyledImage, StyledDegreeModule } from './work-degree.styles';

import SouthamptonUniLogo from './southampton.svg';

import Subsection from '@george-gillams/components/subsection';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { withScrollAnimation } from '@george-gillams/components/effects';

const FINAL_DEGREE_PERCENTAGE = 68;

const SectionWithScroll = withScrollAnimation(Section);
const SubsectionWithScroll = withScrollAnimation(Subsection);

const Degree = props => {
  const [filling, setFilling] = useState(false);
  const [lastFilled, setLastFilled] = useState(-1);
  const [filled, setFilled] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilling(true);
    }, 1000);

    const cleanUp = () => {
      clearTimeout(timeout);
    };
    return cleanUp;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!filling) {
        return;
      }

      const valueToSet = lastFilled + 1;
      const filledCopy = JSON.parse(JSON.stringify(filled));
      filledCopy[valueToSet] = true;
      setLastFilled(valueToSet);
      setFilled(filledCopy);

      if (valueToSet >= filled.length - 1) {
        setFilling(false);
      }
    }, 100);

    const cleanUp = () => {
      clearTimeout(timeout);
    };

    return cleanUp;
  }, [lastFilled, filled, filling]);

  return (
    <PageContainer width={WIDTHS.prose} bottomPadding {...props}>
      <PageTitle link={{ to: '/work', text: 'Work' }} name="MEng Software Engineering 👨‍🎓">
        <StyledImage
          style={{ maxWidth: '20rem' }}
          imgProps={{
            alt: 'University of Southampton Logo',
            className: 'work-degree__img-dark-invert',
          }}
          aspectX={2000}
          aspectY={442}
          lightSrc={SouthamptonUniLogo}
          darkSrc={SouthamptonUniLogo}
        />
        <SectionWithScroll name="Summary">
          <Paragraph>4 year integrated Masters of Engineering (2013 - 2015, 2016 - 2018)</Paragraph>
          <StyledDegreeModule name="Final percentage" percentage={FINAL_DEGREE_PERCENTAGE} filled={filled[0]} />
          <Paragraph>
            Degree classification: <span style={{ fontWeight: 'bold' }}>1st class honours</span>
            <br />
            <br />
            <TextLink href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs" hrefExternal>
              Degree information (current){' '}
            </TextLink>
            <br />
            <TextLink
              href="https://web.archive.org/web/20131128090133/https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules"
              hrefExternal>
              Degree information (archived){' '}
            </TextLink>
          </Paragraph>
        </SectionWithScroll>
        <SectionWithScroll name="Breakdown">
          <SubsectionWithScroll name="Year 1">
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Algorithmics"
              percentage={66}
              filled={filled[1]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Programming I"
              percentage={69}
              filled={filled[2]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Computer Systems"
              percentage={66}
              filled={filled[3]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Data Management"
              percentage={67}
              filled={filled[4]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Professional Development"
              percentage={65}
              filled={filled[5]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Programming II"
              percentage={68}
              filled={filled[6]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Foundations of Computer Science"
              percentage={71}
              filled={filled[7]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Software Modelling"
              percentage={60}
              filled={filled[8]}
            />
          </SubsectionWithScroll>
          <SubsectionWithScroll name="Year 2">
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Distributed Systems"
              percentage={76}
              filled={filled[9]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Intelligent Agents"
              percentage={79}
              filled={filled[10]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Programming III"
              percentage={59}
              filled={filled[11]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Theory of Computing"
              percentage={63}
              filled={filled[12]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Group Project"
              percentage={65}
              filled={filled[13]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Programming Language Concepts"
              percentage={68}
              filled={filled[14]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Interaction Design"
              percentage={61}
              filled={filled[15]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Advanced Software Modelling"
              percentage={60}
              filled={filled[16]}
            />
          </SubsectionWithScroll>
          <SubsectionWithScroll name="Year 3">
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Dissertation Project"
              percentage={73}
              filled={filled[17]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Cyber Security"
              percentage={61}
              filled={filled[18]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Machine Learning"
              percentage={67}
              filled={filled[19]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Advanced Databases"
              percentage={77}
              filled={filled[20]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Secure Systems"
              percentage={77}
              filled={filled[21]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Engineering Law"
              percentage={62}
              filled={filled[22]}
            />
          </SubsectionWithScroll>
          <SubsectionWithScroll name="Year 4">
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Group Design Project"
              percentage={71.75}
              filled={filled[23]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Web Development"
              percentage={63}
              filled={filled[24]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Automated Code Generation"
              percentage={71}
              filled={filled[25]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Semantic Web"
              percentage={70}
              filled={filled[26]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Web Architecture"
              percentage={52}
              filled={filled[27]}
            />
            <StyledDegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              name="Data Mining"
              percentage={62}
              filled={filled[28]}
            />
          </SubsectionWithScroll>
        </SectionWithScroll>
      </PageTitle>
    </PageContainer>
  );
};

export default Degree;
