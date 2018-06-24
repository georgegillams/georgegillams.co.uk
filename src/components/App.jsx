import React from 'react';
import './App.scss';
import ArticleDate from './ArticleDate';
import Button from './Button';
import Section from './Section';
import SubSection from './SubSection';
import AnimatedContent from './AnimatedContent';
import withLazyLoading from './withLazyLoading';
import reactLogo from 'assets/img/react_logo.svg';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <p>Foo to the bar</p>
        <Section name="Running 5 Tough Mudders">
          <SubSection noAnchor name="Why I did it">
            Hellowowoww
          </SubSection>
          <LlAnimatedContent>
            <Button>hello</Button>
          </LlAnimatedContent>
        </Section>
        <ArticleDate date={Date.now()} />
        <img src={reactLogo} height="480" />
        <LlAnimatedContent>
          <Button>hello</Button>
        </LlAnimatedContent>
        <LlAnimatedContent>
          <Button>hello</Button>
        </LlAnimatedContent>
        <LlAnimatedContent>
          <Button>hello</Button>
        </LlAnimatedContent>
        <LlAnimatedContent>
          <Button>hello</Button>
        </LlAnimatedContent>
        <LlAnimatedContent>
          <Button>hello</Button>
        </LlAnimatedContent>
      </div>
    );
  }
}

export default App;
