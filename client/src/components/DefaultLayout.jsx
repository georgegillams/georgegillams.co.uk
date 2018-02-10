import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import RedirectNotice from './RedirectNotice';
import ScrollIndicator from './ScrollIndicator';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import PageContentContainer from './PageContentContainer';

import STYLES from './default-layout.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class DefaultLayout extends React.Component {
  componentWillMount() {
    document.getElementById('body').className = getClassName(
      'default-layout__body',
    );
  }

  render() {
    const location = `${window.location}`;
    const isLocalhost = location.includes('localhost');
    const needsRedirect = !isLocalhost && !location.includes('https');
    if (needsRedirect) {
      window.location = location.replace('http', 'https');
      return <RedirectNotice />;
    }

    const { children } = this.props;

    return (
      <div className={getClassName('default-layout__site')}>
        <ScrollIndicator />
        <br />
        <NavigationBar />
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
