import React, { Component } from 'react';
import BpkText from 'bpk-component-text';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
// import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import ComingSoon from './ComingSoon';

import STYLES from './App.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const MAX_BYTES_TO_HOLD_IN_MEMORY = 240;

// const {
//   animationDurationBase,
// } = TOKENS;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comingSoon: true,
    };

    // <editor-fold> Function Bindings
    // this.uploadConfigurationFile = this.uploadConfigurationFile.bind(this);
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
    link.setAttribute('download', 'configuration.txt');
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "configuration.json".
  }
  // </editor-fold> Helper Methods

  render() {
    return (
      <div>
        <header className={`${getClassName('App__header')} ${getClassName('App--centered')}`}>
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__text')}>George Gillams</BpkText>
                <BpkText tagName="h3" textStyle="md" className={getClassName('App__text')}>Open-source Software Engineer</BpkText>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </header>
        <main className={getClassName('App__main')}>
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <ComingSoon/>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </main>
      </div>
    );
  }
}

export default App;
