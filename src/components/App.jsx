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
import Longleat from '../Pages/Travel/Longleat';
import Munich from '../Pages/Travel/Munich';
import Iceland from '../Pages/Travel/Iceland';
import Photobombing from '../Pages/Services/Photobombing';
import Contact from '../Pages/Contact';
import AboutMe from '../Pages/AboutMe';
import Engagement from '../Pages/Engagement';
import ForOhFour from '../Pages/ForOhFour';
import Degree from '../Pages/Documents/Degree';
import Logo from './Logo';
import PersonalDetails from './PersonalDetails';
import NavigationBar from './NavigationBar';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const children1 = (
  <div>
    <Logo />
    {/* <ProfilePic /> */}
    <PersonalDetails />
    {/* <Navigation /> */}
  </div>
);

const children2 = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/articles/net-neutrality" component={NetNeutrality} />
        <Route path="/articles/vim" component={SwitchToVim} />
        <Route path="/travel/longleat-2017" component={Longleat} />
        <Route path="/travel/munich-2017" component={Munich} />
        <Route path="/net-neutrality" component={NetNeutrality} />
        <Route path="/about" component={AboutMe} />
        <Route path="/travel/iceland-2018" component={Iceland} />
        <Route path="/engagement" component={Engagement} />
        <Route path="/contact" component={Contact} />
        {/* <Route path="/documents/degree" component={Degree} /> */}
        <Route component={ForOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

const App = () => (
  <div>
    {/* <div className={getClassName('app__download-button-container')}>
        <a href="https://dl.dropbox.com/s/smcdcgitd4nog17/George%20Gillams%20CV.pdf?dl=0" className={getClassName('app_cv-link')}>
          <BpkText className={getClassName('app__download-button')} textStyle="sm" >Grab my CV</BpkText>
        </a>
    </div> */}
    <NavigationBar />
    <NavLayout children1={children1} children2={children2} />
  </div>
);

export default App;
