import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import _ from 'lodash';
import routes from './Routes';
// import template from  './template';
// import { extractAssets } from  './webpackStats';

// if (typeof window !== 'undefined' && typeof document !== 'undefined') {
//   const root = document.getElementById('root');
//
//   /* eslint-disable react/jsx-filename-extension */
//   ReactDOM.render(routes, root);
//   module.hot.accept();
// }

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
