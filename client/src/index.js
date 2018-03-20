import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import routes from './Routes';
// import template from  './template';
// import { extractAssets } from  './webpackStats';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const root = document.getElementById('root');

  /* eslint-disable react/jsx-filename-extension */
  ReactDOM.render(routes, root);
  module.hot.accept();
}
