import React from 'react';
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

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

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
          <Logo small />
        </SubSection>
        <SubSection noAnchor name="Button">
          <Button>This is a button</Button>
          <br />
          <br />
          <Button bouncy>This is a bouncy button</Button>
          <br />
          <br />
          <Button large>This is a large button</Button>
          <br />
          <br />
          <Button destructive>This is a destructive button</Button>
        </SubSection>
        <SubSection noAnchor name="Text link">
          <TextLink href="/design">This is an internal text link</TextLink>
          <br />
          <TextLink href="https://www.google.com/" external>
            This is an external text link{' '}
          </TextLink>
        </SubSection>
        <SubSection noAnchor name="Date">
          <ArticleDate date={new Date(Date.now())} />
        </SubSection>
        <SubSection noAnchor name="Code">
          Some <CodeInline>inline code</CodeInline> amongst other text
          <br />
          <br />
          <Code>
            <CodeBashArrow />echo &quot;A block of code.&quot;<br />A block of
            code.
          </Code>
        </SubSection>
        <SubSection noAnchor name="Quote">
          <Quote>
            &quot;Make sure the world remembers your name&quot; - anon.
          </Quote>
        </SubSection>
        <SubSection noAnchor name="Tag">
          <Tag type="photography" />
          <br />
          <br />
          <Tag type="travel" />
          <br />
          <br />
          <Tag type="events" />
        </SubSection>
        <SubSection noAnchor name="Notification">
          <NotificationComp type="neutral">
            This is a `neutral` notification that supports **markdown**
          </NotificationComp>
          <br />
          <br />
          <NotificationComp type="success">
            This is a `success` notification that supports **markdown**
          </NotificationComp>
          <br />
          <br />
          <NotificationComp type="warn">
            This is a `warn` notification that supports **markdown**
          </NotificationComp>
          <br />
          <br />
          <NotificationComp type="error">
            This is a `error` notification that supports **markdown**
          </NotificationComp>
        </SubSection>
        <SubSection noAnchor name="Loading spinner">
          <Loading />
        </SubSection>
        <SubSection noAnchor name="Redirect notice">
          <RedirectNotice />
        </SubSection>
      </Section>
    );
  }
}

export default DesignComponents;
