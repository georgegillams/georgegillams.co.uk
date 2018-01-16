import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import BpkText from 'bpk-component-text';
import PageContentContainer from './PageContentContainer';

// <editor-fold> Content Imports
import HomePage from '../Pages/HomePage';
import Work from '../Pages/Work';
import Photoshop from '../Pages/Photoshop';
import SiteMap from '../Pages/SiteMap';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import MarkAustinOnAnorexiaNervosa from '../Pages/Articles/MarkAustinOnAnorexiaNervosa';
import Longleat from '../Pages/Travel/Longleat';
import Travel from '../Pages/CategoryPages/Travel';
import Articles from '../Pages/CategoryPages/Articles';
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
import Footer from './Footer';
import blackwood from '../images/blackwood.jpg';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class App extends React.Component {
  componentWillMount() {
    document.getElementById('body').className = getClassName('app__body');
  }

  render() {
    const location = window.location.href;
    const homePage = location === 'https://georgegillams.co.uk/' || location === 'https://georgegillams.github.io/' || location === 'http://localhost:3001/';

    const pageContent = (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about/engagement" component={Engagement} />
          {/* <Route path="/articles/anorexia-nervosa" component={MarkAustinOnAnorexiaNervosa} /> */}
          <Route path="/articles/net-neutrality" component={NetNeutrality} />
          <Route path="/articles/vim" component={SwitchToVim} />
          <Route path="/travel/longleat-2017" component={Longleat} />
          <Route path="/travel/munich-2017" component={Munich} />
          <Route path="/travel/iceland-2018" component={Iceland} />
          {/* <Route path="/documents/degree" component={Degree} /> */}
          <Route path="/net-neutrality" component={NetNeutrality} />
          <Route path="/site-map" component={SiteMap} />
          <Route path="/work" component={Work} />
          <Route path="/travel" component={Travel} />
          <Route path="/articles" component={Articles} />
          <Route path="/about" component={AboutMe} />
          <Route path="/photoshop" component={Photoshop} />
          <Route path="/contact" component={Contact} />
          <Route component={ForOhFour} />
        </Switch>
      </BrowserRouter>
    );

    return (
      <div className={getClassName('app__site')}>
        <NavigationBar />
        <div className={getClassName('app__main')} >
          {homePage ?
                (
                     pageContent
    ) : (
      <PageContentContainer>
        {pageContent}
      </PageContentContainer>
    )
        }
          <br />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
