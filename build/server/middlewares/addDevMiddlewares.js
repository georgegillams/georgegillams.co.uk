"use strict";

var path = require('path');

var webpack = require('webpack');

var webpackDevMiddleware = require('webpack-dev-middleware');

var webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: publicPath,
    silent: true,
    stats: 'errors-only'
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  var compiler = webpack(webpackConfig);
  var middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler)); // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead

  var fs = middleware.fileSystem;
  app.get('*', function (req, res) {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), function (err, file) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
//# sourceMappingURL=addDevMiddlewares.js.map