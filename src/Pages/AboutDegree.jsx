import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import DegreeModule from '../components/DegreeModule';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const finalModuleMarks = [
  null,
  69,
  66,
  67,
  71,
  66,
  65,
  68,
  60,
  76,
  79,
  59,
  63,
  65,
  68,
  61,
  60,
  62,
  67,
  61,
  73,
  77,
  77,
  74, // TODO CHANGE THIS!
  63,
  52,
  null,
  null,
  null,
];

class Degree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastSet: -1,
      moduleMarks: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    };
  }

  componentDidMount = () => {
    const updateNextValue = () => {
      const valueToSet = this.state.lastSet + 1;
      const moduleMarksCopy = JSON.parse(
        JSON.stringify(this.state.moduleMarks),
      );
      moduleMarksCopy[valueToSet] = finalModuleMarks[valueToSet];
      this.setState({ lastSet: valueToSet, moduleMarks: moduleMarksCopy });
    };

    setTimeout(() => {
      setInterval(updateNextValue, 100);
    }, 1000);
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section
        name="MEng Software Engineering 👨‍🎓"
        className={classNameFinal.join(' ')}
        {...rest}
      >
        <Section>
          I took a 4 year integrated Masters of Engineering at the University of
          Southampton between the years of 2013 - 2015 and 2016 - 2018
          <br />
          <br />
          <DegreeModule
            name="Final percentage"
            percentage={this.state.moduleMarks[0]}
          />
          <br />
          Degree classification: pending
        </Section>
        {/* )}
        {this.state.selected === 'breakdown' && ( */}
        <Section name="Breakdown">
          <SubSection name="Year 1">
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Programming I"
              percentage={this.state.moduleMarks[1]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Computer Systems"
              percentage={this.state.moduleMarks[2]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Data Management"
              percentage={this.state.moduleMarks[3]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Foundations of Computer Science"
              percentage={this.state.moduleMarks[4]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Algorithmics"
              percentage={this.state.moduleMarks[5]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Professional Development"
              percentage={this.state.moduleMarks[6]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Programming II"
              percentage={this.state.moduleMarks[7]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Software Modelling"
              percentage={this.state.moduleMarks[8]}
            />
          </SubSection>
          <SubSection name="Year 2">
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Distributed Systems"
              percentage={this.state.moduleMarks[9]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Intelligent Agents"
              percentage={this.state.moduleMarks[10]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Programming III"
              percentage={this.state.moduleMarks[11]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Theory of Computing"
              percentage={this.state.moduleMarks[12]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Group Project"
              percentage={this.state.moduleMarks[13]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Programming Language Concepts"
              percentage={this.state.moduleMarks[14]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Interaction Design"
              percentage={this.state.moduleMarks[15]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Advanced Software Modelling"
              percentage={this.state.moduleMarks[16]}
            />
          </SubSection>
          <SubSection name="Year 3">
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Engineering Law"
              percentage={this.state.moduleMarks[17]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Machine Learning"
              percentage={this.state.moduleMarks[18]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Cyber Security"
              percentage={this.state.moduleMarks[19]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Dissertation Project"
              percentage={this.state.moduleMarks[20]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Advanced Databases"
              percentage={this.state.moduleMarks[21]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Secure Systems"
              percentage={this.state.moduleMarks[22]}
            />
          </SubSection>
          <SubSection name="Year 4">
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Group Design Project"
              percentage={this.state.moduleMarks[23]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Web Development"
              percentage={this.state.moduleMarks[24]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Web Architecture"
              percentage={this.state.moduleMarks[25]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Semantic Web"
              percentage={this.state.moduleMarks[26]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Data Mining"
              percentage={this.state.moduleMarks[27]}
            />
            <DegreeModule
              className={getClassName('pages__degree-module')}
              name="Automated Code Generation"
              percentage={this.state.moduleMarks[28]}
            />
          </SubSection>
        </Section>
        {/* )} */}
      </Section>
    );
  }
}

export default Degree;
