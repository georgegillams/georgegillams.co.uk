"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prettyError = _interopRequireDefault(require("pretty-error"));

var actions = _interopRequireWildcard(require("./actions/index"));

var _url = require("utils/url.js");

var pretty = new _prettyError["default"]();

var appFunc = function appFunc(req, res) {
  var splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  var _mapUrl = (0, _url.mapUrl)(actions, splittedUrlPath),
      action = _mapUrl.action,
      params = _mapUrl.params;

  if (action) {
    action(req, params).then(function (result) {
      if (result instanceof Function) {
        result(res);
      } else {
        res.json(result);
      }
    }, function (err) {
      if (err && err.redirect) {
        res.redirect(err.redirect);
      } else {
        // Return a valid response even if there has been some server-side error.
        // This gives us greater control over how we handle errors.
        // Due to a limitation in our `react-saga` exception handling mechanism.
        res.json(err);
      }
    });
  } else {
    res.status(404).end('NOT FOUND');
  }
};

var _default = appFunc;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=api.js.map