import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import ArticleDate from './ArticleDate';
import Button from './Button';
import Section from './Section';
import SubSection from './SubSection';
import AnimatedContent from './AnimatedContent';
import withLazyLoading from './withLazyLoading';
import AboutDegree from '../Pages/AboutDegree';
import routes from '../Routes';
import reactLogo from 'assets/img/react_logo.svg';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

class App extends React.PureComponent {
  render() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const root = document.getElementById('root');

      /* eslint-disable react/jsx-filename-extension */
      ReactDOM.render(routes, root);
    }
  }
}

export default App;
