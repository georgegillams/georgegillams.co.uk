import React from 'react';
import './App.scss';
import ArticleDate from './ArticleDate';
import Button from './Button';
import Section from './Section';
import SubSection from './SubSection';
import AnimatedContent from './AnimatedContent';
import withLazyLoading from './withLazyLoading';
import AboutDegree from '../Pages/AboutDegree';
import Routes from '../Routes/Routes';
import reactLogo from 'assets/img/react_logo.svg';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

class App extends React.PureComponent {
  render() {
    return <Routes />;
  }
}

export default App;
