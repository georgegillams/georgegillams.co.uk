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

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const LogoDemo = bpkDemo(Logo, 'Logo', 'na', { small: true });
const ButtonDemo = bpkDemo(Button, 'Button', 'na', {
  children: 'This is a button',
});
const TextLinkDemo = bpkDemo(TextLink, 'TextLink', 'na', {
  href: 'https://www.gogle.com/',
  external: true,
  children: 'Google ',
});
const ArticleDateDemo = bpkDemo(ArticleDate, 'ArticleDate', 'na', {
  date: new Date(Date.now()),
});
const CodeInlineDemo = bpkDemo(CodeInline, 'CodeInline', 'na', {
  children: 'inline code',
});
const CodeDemo = bpkDemo(Code, 'Code', 'na', {
  children: (
    <div>
      <CodeBashArrow />echo &quot;A block of code.&quot;<br />A block of code.
    </div>
  ),
});
const QuoteDemo = bpkDemo(Quote, 'Quote', 'na', {
  children: '"Make sure the world remembers your name" - anon.',
});
const TagDemo = bpkDemo(Tag, 'Tag', 'na', {
  type: 'photography',
});
const NotificationDemo = bpkDemo(NotificationComp, 'NotificationComp', 'na', {
  type: 'warn',
  children: 'This is a `warn` notification that supports **markdown**',
});

class DesignComponents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Components">
        <SubSection noAnchor name="Logo">
          <LogoDemo />
        </SubSection>
        <SubSection noAnchor name="Button">
          <ButtonDemo />
        </SubSection>
        <SubSection noAnchor name="Text link">
          <TextLinkDemo />
        </SubSection>
        <SubSection noAnchor name="Date">
          <ArticleDateDemo />
        </SubSection>
        <SubSection noAnchor name="Code">
          <CodeInlineDemo />
          <br />
          <br />
          <CodeDemo />
        </SubSection>
        <SubSection noAnchor name="Quote">
          <QuoteDemo />
        </SubSection>
        <SubSection noAnchor name="Tag">
          <TagDemo />
        </SubSection>
        <SubSection noAnchor name="Notification">
          <NotificationDemo />
        </SubSection>
        <SubSection noAnchor name="Loading spinner">
          <Loading />
        </SubSection>
        <SubSection noAnchor name="Redirect notice">
          <RedirectNotice />
        </SubSection>
        <SubSection noAnchor name="Animated container">
          <LlAnimatedContent>
            <div
              style={{
                width: '25rem',
                height: '5rem',
                backgroundColor: '#e02626',
              }}
            />
          </LlAnimatedContent>
        </SubSection>
      </Section>
    );
  }
}

export default DesignComponents;
