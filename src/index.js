import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import WebFont from 'webfontloader';
import App from './components/App';

WebFont.load({
  google: {
    families: ['Quattrocento Sans:400,700'],
  },
});

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
