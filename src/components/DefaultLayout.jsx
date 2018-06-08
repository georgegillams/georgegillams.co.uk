import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import HelperFunctions from '../HelperFunctions';
import NotificationCenter from './NotificationCenter';

import RedirectNotice from './RedirectNotice';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import PageContentContainer from './PageContentContainer';
import CookieBanner from './CookieBanner';

import STYLES from './default-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class DefaultLayout extends React.Component {
  componentWillMount() {
    document.getElementById('body').className = getClassName(
      'default-layout__body',
    );
  }

  render() {
    // const uA = window.navigator.userAgent;
    // const ieOrEdge =
    //   /msie\s|trident\/|edge\//i.test(uA) &&
    //   !!(document.uniqueID || window.MSInputMethodContext);
    // const isIe =
    //   window.navigator.userAgent.indexOf('MSIE') !== -1 ||
    //   window.navigator.appVersion.indexOf('Trident/') > 0;

    // const warningBar = null;

    // if (isIe) {
    //   return (
    //     <div
    //       style={{
    //         width: '100vw',
    //         height: '100vh',
    //         backgroundColor: 'red',
    //         flexDirection: 'column',
    //         color: 'white',
    //         display: 'flex',
    //         fontSize: '2rem',
    //         textAlign: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         backgroundImage: 'linear-gradient(180deg,#000,#a9a9a9)',
    //         fontWeight: 'lighter',
    //         fontFamily:
    //           '-apple-system,BlinkMacSystemFont,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Arial,sans-serif',
    //       }}
    //     >
    //       INTERNET EXPLORER IS NOT SUPPORTED
    //       <br />
    //       <span style={{ fontSize: '1rem', marginBottom: '30vh' }}>
    //         I guess it&apos;s time to get a browser fit for the 21st Century 👍
    //         <br />
    //         Download{' '}
    //         <a href="https://www.mozilla.org/en-GB/firefox/new/">
    //           Mozilla Firefox
    //         </a>{' '}
    //         to support a free, open, and healthy internet.
    //       </span>
    //       <span style={{ fontSize: '1rem' }}>
    //         If you&apos;re just here for my contact details, and don&apos;t need
    //         to see my website in all its glory, here they are:&#10; <br />
    //         <a href="tel:+447867592615">Call +44 (0) 786759 2615</a>
    //         <br />
    //         <a href="mailto:g@georgegillams.co.uk">
    //           Email g@georgegillams.co.uk
    //         </a>
    //       </span>
    //     </div>
    //   );
    // }

    // if (ieOrEdge) {
    //   warningBar = (
    //     <div
    //       style={{
    //         width: '100vw',
    //         height: '10rem',
    //         backgroundColor: 'red',
    //         flexDirection: 'column',
    //         color: 'white',
    //         display: 'flex',
    //         fontSize: '2rem',
    //         textAlign: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         backgroundImage: 'linear-gradient(180deg,red,darkred)',
    //         fontWeight: 'lighter',
    //         fontFamily:
    //           '-apple-system,BlinkMacSystemFont,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Arial,sans-serif',
    //       }}
    //     >
    //       EDGE IS NOT A GREAT BROWSER TO USE
    //       <br />
    //       <span style={{ fontSize: '1rem', marginTop: '1rem' }}>
    //         Microsoft repeatedly fail to embrace web standards, and don&apos;t
    //         release timely security updates.
    //         <br />
    //         Download{' '}
    //         <a href="https://www.mozilla.org/en-GB/firefox/new/">
    //           Mozilla Firefox
    //         </a>{' '}
    //         to support a free, open, and healthy internet.
    //       </span>
    //     </div>
    //   );
    // }

    const location = `${window.location}`;
    const isLocalNetwork = HelperFunctions.isLocalHost(location);
    const isLocalhost = HelperFunctions.isLocalHost(location);
    const needsRedirect =
      !(isLocalhost || isLocalNetwork) &&
      !HelperFunctions.includes(location, 'https');
    if (needsRedirect) {
      window.location = location.replace('http', 'https');
      return <RedirectNotice />;
    }

    const { children } = this.props;

    return (
      <div className={getClassName('default-layout__site')}>
        <CookieBanner />
        {/* {warningBar && warningBar} */}
        <NavigationBar />
        <NotificationCenter />
        <div className={getClassName('default-layout__main')}>
          <PageContentContainer>{children}</PageContentContainer>
          <br />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

DefaultLayout.defaultProps = {
  children: null,
};

export default DefaultLayout;
