import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import BpkText from 'bpk-component-text';
import NavLayout from './NavLayout';

// <editor-fold> Content Imports
import HomePage from '../Pages/HomePage';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import Munich from '../Pages/Travel/Munich';
import Photobombing from '../Pages/Services/Photobombing';
import Contact from '../Pages/Contact';
import AboutMe from '../Pages/AboutMe';
import Engagement from '../Pages/Engagement';
import ForOhFour from '../Pages/ForOhFour';
// </editor-fold> Content Imports

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <BrowserRouter>
    <div>
      {/* <div className={getClassName('app__download-button-container')}>
        <a href="https://dl.dropbox.com/s/smcdcgitd4nog17/George%20Gillams%20CV.pdf?dl=0" className={getClassName('app_cv-link')}>
          <BpkText className={getClassName('app__download-button')} textStyle="sm" >Grab my CV</BpkText>
        </a>
    </div> */}
      <NavLayout>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/articles/net-neutrality" component={NetNeutrality} />
            <Route path="/articles/vim" component={SwitchToVim} />
            <Route path="/services/photobombing" component={Photobombing} />
            <Route path="/travel/munich-2017" component={Munich} />
            <Route path="/net-neutrality" component={NetNeutrality} />
            <Route path="/contact" component={Contact} />
            <Route component={ForOhFour} />
          </Switch>
        </div>
      </NavLayout>
    </div>
  </BrowserRouter>
);
// <Route path="/travel/iceland" component={Iceland} />
// <Route path="/engagement" component={Engagement} />
// <Route path="/about" component={AboutMe} />

export default App;
