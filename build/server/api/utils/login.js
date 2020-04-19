"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = login;

var _datum = require("../actions/datum");

var _find = require("utils/find");

var _constants = require("helpers/constants");

var _hash = require("utils/hash");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

function login(reqSecured, userProfile) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoad)({
      redisKey: 'sessions'
    }).then(function (sessionData) {
      var session = {};
      session.sessionKey = (0, _hash.generateKey)();
      session.userId = userProfile.id;
      userProfile.session = session.sessionKey;
      session.userAuthenticatedTimestamp = Date.now();
      (0, _datum.datumCreate)({
        redisKey: 'sessions'
      }, {
        body: session
      }).then(function () {
        (0, _setContentLastUpdatedTimestamp["default"])();
        resolve(userProfile);
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=login.js.map