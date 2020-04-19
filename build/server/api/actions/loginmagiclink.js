"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loginmagiclink;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find3 = require("utils/find");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _login = _interopRequireDefault(require("utils/login"));

function loginmagiclink(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    var magicLinkKey = reqSecured.body.magicLinkKey;
    (0, _datum.datumLoad)({
      redisKey: 'magiclinks'
    }).then(function (magicLinkData) {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
        var _find = (0, _find3.find)(magicLinkData, magicLinkKey, 'key'),
            magicLink = _find.existingValue;

        if (magicLink) {
          var _find2 = (0, _find3.find)(userData, magicLink.userId),
              user = _find2.existingValue;

          if (Date.now() < new Date(magicLink.expiry).getTime()) {
            // invalidate magic link (set expiry to 0)
            magicLink.expiry = 0;
            (0, _datum.datumUpdate)({
              redisKey: 'magiclinks'
            }, {
              body: magicLink
            });
            resolve((0, _login["default"])(reqSecured, user));
          } else {
            reject({
              error: 'wrong-input',
              errorMessage: 'Magic link has expired'
            });
          }
        } else {
          reject({
            error: 'wrong-input',
            errorMessage: 'Invalid magic link'
          });
        }
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loginmagiclink.js.map