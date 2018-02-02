import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import {
  Router,
  RouterContext,
  match,
  browserHistory,
  createMemoryHistory,
} from 'react-router';

import routes from './Routes';
// import template from  './template';
// import { extractAssets } from  './webpackStats';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const root = document.getElementById('root');

  ReactDOM.render(
    React.createElement(Router, {
      history: browserHistory,
      onUpdate: () => {
        if (!`${window.location}`.includes('#')) {
          window.scrollTo(0, 0);
        }
      },
      routes,
    }),
    root,
  );
}

// export default (locals, callback) => {
//   const history = createMemoryHistory();
//   const location = history.createLocation(locals.path);
//   const assets = extractAssets(locals.webpackStats);
//
//   match({ routes, location, history }, (error, redirectLocation, props) => {
//     // Explicit check for null here due to odd behaviour with react router's match function
//     // It passes undefined in cases where matches are not found.
//     // So we use their error object if it is truthy, otherwise we create our own.
//     if (error !== null) {
//       return callback(
//         error ||
//           new Error(`React Router failed to match ${JSON.stringify(location)}`),
//       );
//     }
//
//     if (redirectLocation) {
//       return callback(
//         error,
//         `<script>window.location = '${redirectLocation.pathname}';</script>`,
//       );
//     }
//
//     const html = ReactDOMServer.renderToStaticMarkup(
//       React.createElement(RouterContext, props),
//     );
//     const head = Helmet.rewind();
//
//     return callback(error, template({ head, html, assets }));
//   });
// };
