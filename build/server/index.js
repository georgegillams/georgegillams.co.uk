"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var _path = require("path");

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _socket = _interopRequireDefault(require("socket.io"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _herokuSslRedirect = _interopRequireDefault(require("heroku-ssl-redirect"));

var _constants = require("helpers/constants");

var _logger = _interopRequireDefault(require("./util//logger"));

var _seo = _interopRequireDefault(require("./seo"));

var _api = _interopRequireDefault(require("./api/api"));

var _greasemonkey = _interopRequireDefault(require("./greasemonkey"));

var _redirectNonWWW = _interopRequireDefault(require("./redirectNonWWW"));

var _argv = _interopRequireDefault(require("./util/argv"));

var _port = _interopRequireDefault(require("./util//port"));

var _frontendMiddleware = _interopRequireDefault(require("./middlewares/frontendMiddleware"));

/* eslint consistent-return:0 */
var app = (0, _express["default"])();
var server = new _http["default"].Server(app);
var io = new _socket["default"](server);
io.path('/ws');

if (process.env.NODE_ENV === 'production' && !_constants.PROJECT_UNDER_TEST) {
  app.use((0, _cors["default"])({
    origin: _constants.SITE_URL
  }));
}

app.use((0, _expressFileupload["default"])());
app.use(_redirectNonWWW["default"]);
app.use(_greasemonkey["default"]);
app.use((0, _expressSession["default"])({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_seo["default"]); // If you need a backend, e.g. an API, add your custom backend-specific middleware here

app.use('/api', _api["default"]); // Add static projects (eg pecha kucha etc)
// app.use('/', express.static(__dirname + '/../public')); // ← adjust
// In production we need to pass these values in instead of relying on webpack

(0, _frontendMiddleware["default"])(app, {
  outputPath: (0, _path.resolve)(process.cwd(), 'build'),
  publicPath: '/'
}); // get the intended host and port number, use localhost and port 3000 if not provided

var customHost = _argv["default"].host || process.env.HOST;
var host = customHost || null; // Let http.Server use its default IPv6/4 host

var prettyHost = customHost || 'localhost'; // Start your app.

app.listen(_port["default"], host, function (err) {
  if (err) {
    return _logger["default"].error(err.message);
  }

  _logger["default"].appStarted(_port["default"], prettyHost);
});
//# sourceMappingURL=index.js.map