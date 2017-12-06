import React from 'react';
import BpkText from 'bpk-component-text';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkButton from 'bpk-component-button';
import GetSocial from './GetSocial';
import NavLayout from './NavLayout';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div>
    <header className={`${getClassName('app__header')} ${getClassName('app--centered')}`}>
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={12}>
            <BpkText tagName="h1" textStyle="xxl" className={getClassName('app__text')}>George Gillams</BpkText>
            <BpkText tagName="h3" textStyle="md" className={getClassName('app__text')}>Open-source Software Engineer</BpkText>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
    </header>
    <a href="https://dl.dropbox.com/s/smcdcgitd4nog17/George%20Gillams%20CV.pdf?dl=0">
      <BpkButton link onClick={null} className={getClassName('app__download-button')}>Download CV</BpkButton>
    </a>
    <GetSocial />
    <NavLayout />
  </div>
);

export default App;
