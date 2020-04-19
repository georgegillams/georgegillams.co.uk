"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authentication;

var _safeCompare = _interopRequireDefault(require("safe-compare"));

var _datum = require("../actions/datum");

var _find3 = require("./find");

var secretApiKey = process.env.SECRET_API_KEY;

function authentication(req) {
  return new Promise(function (resolve) {
    var sessionKey = req.cookies.session;
    var apiKey = req.headers.apikey; // important to use `safeCompare` here to prevent
    // a timing attack to discover the key

    if (apiKey && (0, _safeCompare["default"])(apiKey, secretApiKey)) {
      resolve({
        id: 'direct_API_invocator',
        admin: true,
        uname: 'direct_API_invocation'
      });
    } else if (sessionKey) {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        (0, _datum.datumLoad)({
          redisKey: 'sessions'
        }).then(function (sessionData) {
          // `find` uses `safeCompare` so it is safe to use for authentication
          var _find = (0, _find3.find)(sessionData, sessionKey, 'sessionKey'),
              userSession = _find.existingValue;

          if (userSession) {
            var _find2 = (0, _find3.find)(userData, userSession.userId),
                userProfile = _find2.existingValue;

            if (userProfile) {
              resolve(userProfile);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });
    } else {
      resolve(null);
    }
  });
}

module.exports = exports.default;
//# sourceMappingURL=authentication.js.map