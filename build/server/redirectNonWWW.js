"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var redirectNonWWW = function redirectNonWWW(req, res, next) {
  if (_constants.NODE_ENV !== 'production' || _constants.PROJECT_UNDER_TEST) {
    next();
  } else {
    if (req.headers.host.match(/^www/) == null) {
      var newURL = 'https://www.' + req.headers.host + req.url;
      res.redirect(newURL);
    } else {
      next();
    }
  }
};

var _default = redirectNonWWW;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=redirectNonWWW.js.map