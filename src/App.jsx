import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
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
  <BrowserRouter>
    <div>
      <div className={getClassName('app__download-button-container')}>
        <a href="https://dl.dropbox.com/s/smcdcgitd4nog17/George%20Gillams%20CV.pdf?dl=0" className={getClassName('app_cv-link')}>
          <BpkText className={getClassName('app__download-button')} textStyle="sm" >Grab my CV</BpkText>
        </a>
      </div>
      <NavLayout>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/?p=/net-neutrality" component={NetNeutrality} />
            <Route path="/?p=/stuff" component={Stuff} />
            <Route path="/?p=/contact" component={Contact} />
            <Route path="/?p=/nn" render={() => (<Redirect to="/net-neutrality" />)} />
          </Switch>
        </div>
      </NavLayout>
    </div>
  </BrowserRouter>
);

export default App;
