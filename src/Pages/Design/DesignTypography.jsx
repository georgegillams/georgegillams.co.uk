import React from 'react';
import withLazyLoading from '../../components/withLazyLoading';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import SubSection from '../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Button from '../../components/Button';
import Code from '../../components/Code';
import CodeInline from '../../components/CodeInline';
import CodeBashArrow from '../../components/CodeBashArrow';
import Logo from '../../components/Logo';
import Loading from '../../components/Loading';
import Quote from '../../components/Quote';
import RedirectNotice from '../../components/RedirectNotice';
import Tag from '../../components/Tag';
import NotificationComp from '../../components/NotificationComp';
import AnimatedContent from '../../components/AnimatedContent';
import bpkDemo from '../../components/bpk-component-demo/src/BpkDemo';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const demoClassName = getClassName('pages__bpk-demo');

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const SectionDemo = bpkDemo(Section, 'Section', 'na', {
  name: 'Section name',
  children: 'Some section content',
});
const SubSectionDemo = bpkDemo(SubSection, 'SubSection', 'na', {
  name: 'Sub-section name',
  children: 'Some sub-section content',
});

class DesignTypography extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Typography">
        <SubSection noAnchor name="Section">
          <SectionDemo className={demoClassName} />
        </SubSection>
        <SubSection noAnchor name="Subsection">
          <SubSectionDemo className={demoClassName} />
        </SubSection>
      </Section>
    );
  }
}

export default DesignTypography;
