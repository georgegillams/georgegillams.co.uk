import React from 'react';

import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import Consent from 'containers/common/Consent';
import Analytics from 'containers/common/Analytics';
import Authenticator from 'containers/common/Authenticator';
import Konami from 'containers/common/Konami';

import withReduxStore from 'utils/common/redux/with-redux-store';
import appConfig from 'helpers/appConfig';
import Navigation from 'containers/NavigationBarWrapper';
import AppWrapper from 'components/common/AppWrapper';
import { enableES5 } from 'immer';

import 'global-styles.scss';

// Ensures that `immer` will work inside Internet Explorer
enableES5();

class Srr extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <React.StrictMode>
        <Head>
          <title>{appConfig.projectTitle}</title>
          {appConfig.app.head.meta.map(m => (
            <meta key={m.property} name={m.property} content={m.content} />
          ))}
        </Head>

        <Provider store={reduxStore}>
          <AppWrapper>
            <Navigation />
            <Konami />
            <Consent />
            <Analytics />
            <Authenticator />
            <Component {...pageProps} />
          </AppWrapper>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default withReduxStore(Srr);
