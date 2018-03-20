import React from 'react';
import PageContentContainer from './PageContentContainer';

// <editor-fold> Content Imports
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

import STYLES from './default-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class GoogleAds extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className={getClassName('google-ads__main')}
        style={{
          marginBottom: '1rem',
          background: 'lightblue',
          display: 'block',
          width: '100%',
          height: '5rem',
        }}
        data-ad-client="ca-pub-6708278188302335"
        data-ad-format="auto"
      />
    );
  }
}

export default GoogleAds;
