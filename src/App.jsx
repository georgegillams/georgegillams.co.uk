import React, { Component } from 'react';
import BpkText from 'bpk-component-text';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
// import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkButton  from 'bpk-component-button';
import MainContent  from './MainContent';
import GetSocial  from './GetSocial';
import NavLayout  from './NavLayout';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const MAX_BYTES_TO_HOLD_IN_MEMORY = 240;

// const {
//   animationDurationBase,
// } = TOKENS;

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   comingSoon: true,
    // };

    // <editor-fold> Function Bindings
    this.downloadPdf = this.downloadPdf.bind(this);
    // </editor-fold> Function Bindings
  }

  // <editor-fold> State Setters
  // onDataPatternChanged(event) {
  //   this.setState({ dataPattern: event.target.value });
  // }
  // </editor-fold> State Setters

  // <editor-fold> Helper Methods
  downloadPdf() {
    const fileContent = `data:text/txt;charset=utf-8,${"PDF Coming soon!"}`;
    const encodedUri = encodeURI(fileContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'george_gillams_no_pdf.txt');
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "configuration.json".
  }
  // </editor-fold> Helper Methods

  render() {
    return (
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
        <BpkButton link onClick={this.downloadPdf} className={getClassName('app__download-button')}>Download CV</BpkButton>
        <NavLayout/>
      </div>
    );
  }
}

export default App;
