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
import LicenseInfo from '../../components/LicenseInfo';
import ColourPalleteItem from '../../components/ColourPalleteItem';
import ArticleCard from '../../components/ArticleCard';
import bpkDemo from '../../components/bpk-component-demo/src/BpkDemo';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const LogoDemo = bpkDemo(Logo, 'Logo', 'na', { small: true, noPadding: true });
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
  noPadding: true,
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
const LicenseInfoDemo = bpkDemo(LicenseInfo, 'LicenseInfo', 'na', {});
const ColourPalleteItemDemo = bpkDemo(
  ColourPalleteItem,
  'ColourPalleteItem',
  'na',
  { colour: '#44aeff', colourName: 'Blue' },
);
const ArticleCardDemo = bpkDemo(ArticleCard, 'ArticleCard', 'na', {
  fillImageSrc: 'http://placehold.it/1200x120/FF3F41/&text=image1',
  imageSrc: 'http://placehold.it/200x120/ffff&text=image2',
  title: 'Card example',
  light: true,
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
        <SubSection noAnchor name="License info">
          <LicenseInfoDemo />
        </SubSection>
        <SubSection noAnchor name="Card">
          <ArticleCardDemo />
        </SubSection>
        <SubSection noAnchor name="Colour pallete item">
          <ColourPalleteItemDemo />
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
