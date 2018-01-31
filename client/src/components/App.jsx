import React from 'react';
import 'whatwg-fetch';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageContentContainer from './PageContentContainer';

// <editor-fold> Content Imports
import Admin from '../Pages/Admin';
import HomePage from '../Pages/HomePage';
import ComingSoon from './ComingSoon';
import Work from '../Pages/Work/Work';
import PasswordCharacterExtractor from '../Pages/Work/PasswordCharacterExtractor';
import Art from '../Pages/Art/Art';
import SiteMap from '../Pages/SiteMap';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import UkBankSecurity from '../Pages/Articles/UkBankSecurity';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import MarkAustinOnAnorexiaNervosa from '../Pages/Articles/MarkAustinOnAnorexiaNervosa';
import Disneyland from '../Pages/Travel/Disneyland';
import SerreChevalier from '../Pages/Travel/SerreChevalier';
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
import NavigationBar from './NavigationBar';
import Footer from './Footer';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class App extends React.Component {
  state = {
    response: 'no response yet',
  };
  componentWillMount() {
    document.getElementById('body').className = getClassName('app__body');
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };
  //
  // componentDidMount() {
  //   this.callApi()
  //     .then((res) => {
  //       this.setState({ response: res.express });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    const location = `${window.location}`;
    const isLocalhost = location.includes('localhost');
    const needsRedirect = !isLocalhost && !location.includes('https');
    if (needsRedirect) {
      window.location = location.replace('http', 'https');
    }

    return (
      <div className={getClassName('app__site')}>
        <NavigationBar />
        <div className={getClassName('app__main')}>
          <PageContentContainer>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about/engagement" component={Engagement} />
                {isLocalhost && (
                  <Route
                    path="/articles/anorexia-nervosa"
                    component={MarkAustinOnAnorexiaNervosa}
                  />
                )}
                <Route path="/articles/net-neutrality" component={NetNeutrality} />
                <Route path="/articles/vim" component={SwitchToVim} />
                <Route path="/articles/uk-bank-security" component={UkBankSecurity} />
                <Route path="/travel/longleat-2017" component={Longleat} />
                <Route path="/travel/munich-2017" component={Munich} />
                <Route path="/travel/iceland-2018" component={Iceland} />
                <Route path="/travel/disneyland-2017" component={Disneyland} />
                <Route path="/travel/serre-chevalier-2017" component={SerreChevalier} />
                <Route
                  path="/apps/password-character-extractor"
                  component={PasswordCharacterExtractor}
                />
                {isLocalhost && <Route path="/documents/degree" component={Degree} />}
                <Route path="/net-neutrality" component={NetNeutrality} />
                <Route path="/site-map" component={SiteMap} />
                <Route path="/work" component={Work} />
                <Route path="/travel" component={Travel} />
                <Route path="/articles" component={Articles} />
                <Route path="/about" component={AboutMe} />
                <Route path="/art" component={Art} />
                <Route path="/photoshop" component={Art} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin" component={Admin} />
                <Route component={ForOhFour} />
              </Switch>
            </BrowserRouter>
          </PageContentContainer>
          <br />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
