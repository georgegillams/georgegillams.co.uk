import React from 'react';
import {
  Route,
  HashRouter,
} from 'react-router-dom';
import BpkText from 'bpk-component-text';
import NavLayout from './NavLayout';

// <editor-fold> Content Imports
import HomePage from './HomePage';
import Stuff from './Stuff';
import NetNeutrality from './Articles/NetNeutrality';
import Contact from './Contact';
// </editor-fold> Content Imports

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <HashRouter>
    <div>
      <div className={getClassName('app__download-button-container')}>
        <a href="https://dl.dropbox.com/s/smcdcgitd4nog17/George%20Gillams%20CV.pdf?dl=0">
          <BpkText className={getClassName('app__download-button')} textStyle="sm" >Grab my CV</BpkText>
        </a>
      </div>
      <NavLayout>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/net-neutrality" component={NetNeutrality} />
          <Route path="/stuff" component={Stuff} />
          <Route path="/contact" component={Contact} />
        </div>
      </NavLayout>
    </div>
  </HashRouter>
);

export default App;
