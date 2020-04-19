"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _superagent = _interopRequireDefault(require("superagent"));

var _config = _interopRequireDefault(require("../config"));

var methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  var adjustedPath = path[0] !== '/' ? "/".concat(path) : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return "http://".concat(_config["default"].apiHost, ":").concat(_config["default"].apiPort).concat(adjustedPath);
  } // Prepend `/api` to relative URL, to proxy to API server.


  return "/api".concat(adjustedPath);
}

var ApiClient =
/*#__PURE__*/
function () {
  function ApiClient(req) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ApiClient);
    methods.forEach(function (method) {
      return _this[method] = function (path) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            params = _ref.params,
            data = _ref.data;

        return new Promise(function (resolve, reject) {
          var request = _superagent["default"][method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (__SERVER__ && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }

          if (data) {
            request.send(data);
          }

          request.end(function (err) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                body = _ref2.body;

            return err ? reject(body || err) : resolve(body);
          });
        });
      };
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */


  (0, _createClass2["default"])(ApiClient, [{
    key: "empty",
    value: function empty() {}
  }]);
  return ApiClient;
}();

exports["default"] = ApiClient;
module.exports = exports.default;
//# sourceMappingURL=ApiClient.js.map