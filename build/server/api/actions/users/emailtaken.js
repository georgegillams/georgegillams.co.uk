"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = emailtaken;

var _datum = require("../datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./usersAllowedAttributes"));

var _find2 = require("utils/find");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function emailtaken(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve) {
    setTimeout(function () {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        // `find` uses `safeCompare` so it protects against user-enumeration
        var _find = (0, _find2.find)(userData, (0, _find2.emailFingerprint)(reqSecured.body.email), 'emailFingerPrint'),
            userWithEmail = _find.existingValue;

        if (userWithEmail) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}

module.exports = exports.default;
//# sourceMappingURL=emailtaken.js.map