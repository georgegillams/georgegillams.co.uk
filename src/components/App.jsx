import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import BpkText from 'bpk-component-text';

// <editor-fold> Content Imports
import HomePage from '../Pages/HomePage';
import SiteMap from '../Pages/SiteMap';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import MarkAustinOnAnorexiaNervosa from '../Pages/Articles/MarkAustinOnAnorexiaNervosa';
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
import blackwood from '../images/blackwood.jpg';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div>
    <NavigationBar />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/articles/anorexia-nervosa" component={MarkAustinOnAnorexiaNervosa} /> */}
        <Route path="/articles/net-neutrality" component={NetNeutrality} />
        <Route path="/articles/vim" component={SwitchToVim} />
        <Route path="/travel/longleat-2017" component={Longleat} />
        <Route path="/travel/munich-2017" component={Munich} />
        <Route path="/net-neutrality" component={NetNeutrality} />
        <Route path="/site-map" component={SiteMap} />
        <Route path="/about" component={AboutMe} />
        <Route path="/travel/iceland-2018" component={Iceland} />
        <Route path="/engagement" component={Engagement} />
        <Route path="/contact" component={Contact} />
        {/* <Route path="/documents/degree" component={Degree} /> */}
        <Route component={ForOhFour} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
