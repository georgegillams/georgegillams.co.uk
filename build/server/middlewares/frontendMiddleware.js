"use strict";

/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = function (app, options) {
  var isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    var addProdMiddlewares = require('./addProdMiddlewares');

    addProdMiddlewares(app, options);
  } else {
    var webpackConfig = require('../../config/webpack.dev.babel');

    var addDevMiddlewares = require('./addDevMiddlewares');

    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
//# sourceMappingURL=frontendMiddleware.js.map