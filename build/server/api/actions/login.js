"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = login;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find2 = require("utils/find");

var _constants = require("helpers/constants");

var _hash = require("utils/hash");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _login = _interopRequireDefault(require("utils/login"));

function login(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    (0, _datum.datumLoad)({
      redisKey: 'users'
    }).then(function (userData) {
      var _find = (0, _find2.find)(userData, reqSecured.body.email.toLowerCase(), 'email'),
          userProfile = _find.existingValue;

      if (userProfile) {
        if (!userProfile.hash || !(0, _hash.compareHash)(reqSecured.body.password, userProfile.hash)) {
          reject(_constants.INVALID_CREDENTIALS);
        } else {
          (0, _login["default"])(reqSecured, userProfile).then(function (loginResult) {
            resolve(loginResult);
          });
        }
      } else {
        reject(_constants.INVALID_CREDENTIALS);
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=login.js.map