import React, { useState, useEffect } from 'react';
// import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import { Image } from 'ggComponents/Image';
import { cssModules } from 'ggComponents/helpers/cssModules';
import { Paragraph } from 'ggComponents/Paragraph';
import { Section } from 'ggComponents/Section';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import { DegreeModule } from 'ggComponents/Degree';

import STYLES from './work-degree.module.scss';

import MyDegreeImage from './degree_bitmoji.png';
import SouthamptonUniLogo from './southampton.svg';

import Subsection from 'ggComponents/Subsection/Subsection';

const getClassName = cssModules(STYLES);

const FINAL_DEGREE_PERCENTAGE = 68;

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
    <div {...props}>
      <PageTitle link={{ to: '/work', text: 'Work' }} name="MEng Software Engineering 👨‍🎓">
        <Image
          className={getClassName('work-degree__image')}
          imgProps={{
            alt: 'My degree',
          }}
          aspectX={1}
          aspectY={1}
          lightSrc={MyDegreeImage}
          darkSrc={MyDegreeImage}
        />
        <br />
        <Image
          className={getClassName('work-degree__image')}
          style={{ maxWidth: '20rem' }}
          imgProps={{
            alt: 'My degree',
            className: getClassName('work-degree__img-dark-invert'),
          }}
          aspectX={2000}
          aspectY={442}
          lightSrc={SouthamptonUniLogo}
          darkSrc={SouthamptonUniLogo}
        />
        <Section name="Summary">
          <Paragraph>4 year integrated Masters of Engineering (2013 - 2015, 2016 - 2018)</Paragraph>
          <DegreeModule name="Final percentage" percentage={FINAL_DEGREE_PERCENTAGE} filled={filled[0]} />
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
        </Section>
        <Section name="Breakdown">
          <Subsection name="Year 1">
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Algorithmics"
              percentage={66}
              filled={filled[1]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Programming I"
              percentage={69}
              filled={filled[2]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Computer Systems"
              percentage={66}
              filled={filled[3]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Data Management"
              percentage={67}
              filled={filled[4]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Professional Development"
              percentage={65}
              filled={filled[5]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Programming II"
              percentage={68}
              filled={filled[6]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Foundations of Computer Science"
              percentage={71}
              filled={filled[7]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Software Modelling"
              percentage={60}
              filled={filled[8]}
            />
          </Subsection>
          <Subsection name="Year 2">
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Distributed Systems"
              percentage={76}
              filled={filled[9]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Intelligent Agents"
              percentage={79}
              filled={filled[10]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Programming III"
              percentage={59}
              filled={filled[11]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Theory of Computing"
              percentage={63}
              filled={filled[12]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Group Project"
              percentage={65}
              filled={filled[13]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Programming Language Concepts"
              percentage={68}
              filled={filled[14]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Interaction Design"
              percentage={61}
              filled={filled[15]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Advanced Software Modelling"
              percentage={60}
              filled={filled[16]}
            />
          </Subsection>
          <Subsection name="Year 3">
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Dissertation Project"
              percentage={73}
              filled={filled[17]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Cyber Security"
              percentage={61}
              filled={filled[18]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Machine Learning"
              percentage={67}
              filled={filled[19]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Advanced Databases"
              percentage={77}
              filled={filled[20]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Secure Systems"
              percentage={77}
              filled={filled[21]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Engineering Law"
              percentage={62}
              filled={filled[22]}
            />
          </Subsection>
          <Subsection name="Year 4">
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Group Design Project"
              percentage={71.75}
              filled={filled[23]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Web Development"
              percentage={63}
              filled={filled[24]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Automated Code Generation"
              percentage={71}
              filled={filled[25]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Semantic Web"
              percentage={70}
              filled={filled[26]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Web Architecture"
              percentage={52}
              filled={filled[27]}
            />
            <DegreeModule
              markerPosition={FINAL_DEGREE_PERCENTAGE}
              className={getClassName('work-degree__module')}
              name="Data Mining"
              percentage={62}
              filled={filled[28]}
            />
          </Subsection>
        </Section>
      </PageTitle>
    </div>
  );
};

export default Degree;
