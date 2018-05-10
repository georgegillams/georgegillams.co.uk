import React from 'react';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import DegreeModule from '../components/DegreeModule';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Degree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'overview',
    };
  }

  onClick = e => {
    this.setState({
      selected: e.target.name,
    });
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section
        name="G600 👨‍🎓 MEng Software Engineering (University of Southampton)"
        className={classNameFinal.join(' ')}
        {...rest}
      >
        <br />
        <BpkHorizontalNav style={{ margin: '1.2rem 0' }}>
          <BpkHorizontalNavItem
            name="overview"
            selected={this.state.selected === 'overview'}
            onClick={this.onClick}
          >
            Summary
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="detail"
            selected={this.state.selected === 'detail'}
            onClick={this.onClick}
          >
            Breakdown
          </BpkHorizontalNavItem>
        </BpkHorizontalNav>
        {this.state.selected === 'overview' && (
          <Section>
            4 year integrated Masters of Engineering between the years of 2013 -
            2015 and 2016 - 2018
            <br />
            <br />
            <DegreeModule name="Final percentage" percentage={null} />
            <br />
            Degree classification: pending
          </Section>
        )}
        {this.state.selected === 'detail' && (
          <Section>
            <SubSection name="Year 1">
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Programming I"
                percentage={69}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Computer Systems"
                percentage={66}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Data Management"
                percentage={67}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Foundations of Computer Science"
                percentage={71}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Algorithmics"
                percentage={66}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Professional Development"
                percentage={65}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Programming II"
                percentage={68}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Software Modelling"
                percentage={60}
              />
            </SubSection>
            <SubSection name="Year 2">
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Distributed Systems"
                percentage={76}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Intelligent Agents"
                percentage={79}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Programming III"
                percentage={59}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Theory of Computing"
                percentage={63}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Group Project"
                percentage={65}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Programming Language Concepts"
                percentage={68}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Interaction Design"
                percentage={61}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Advanced Software Modelling"
                percentage={60}
              />
            </SubSection>
            <SubSection name="Year 3">
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Engineering Law"
                percentage={62}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Machine Learning"
                percentage={67}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Cyber Security"
                percentage={61}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Dissertation Project"
                percentage={73}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Advanced Databases"
                percentage={77}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Secure Systems"
                percentage={77}
              />
            </SubSection>
            <SubSection name="Year 4">
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Group Design Project"
                percentage={null}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Web Development"
                percentage={63}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Web Architecture"
                percentage={52}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Semantic Web"
                percentage={null}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Data Mining"
                percentage={null}
              />
              <DegreeModule
                className={getClassName('pages__degree-module')}
                name="Automated Code Generation"
                percentage={null}
              />
            </SubSection>
          </Section>
        )}
      </Section>
    );
  }
}

export default Degree;
