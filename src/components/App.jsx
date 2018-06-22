import React from 'react';
import './App.scss';
import ArticleDate from './ArticleDate';
import Section from './Section';
import SubSection from './SubSection';
import reactLogo from 'assets/img/react_logo.svg';

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
        </Section>
        <ArticleDate date={Date.now()} />
        <img src={reactLogo} height="480" />
      </div>
    );
  }
}

export default App;
