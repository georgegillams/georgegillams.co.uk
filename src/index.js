import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Quattrocento Sans:300,400,700', 'sans-serif'],
  },
});

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
