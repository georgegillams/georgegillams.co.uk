"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadAuth;

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function loadAuth(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user) {
        user.emailFingerprint = null;
        user.hash = null;
      }

      resolve(user);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loadAuth.js.map