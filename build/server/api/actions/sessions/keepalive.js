"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = keepalive;

var _datum = require("../datum");

var _constants = require("helpers/constants");

var _getContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/getContentLastUpdatedTimestamp"));

var _find2 = require("utils/find");

function keepalive(req) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoad)({
      redisKey: 'sessions'
    }).then(function (sessionData) {
      var _find = (0, _find2.find)(sessionData, req.cookies.session, 'sessionKey'),
          session = _find.existingValue;

      if (session) {
        session.lastActive = Date.now();
        (0, _datum.datumUpdate)({
          redisKey: 'sessions'
        }, {
          body: session
        });
      } else {
        reject(_constants.INVALID_SESSION);
      }

      resolve((0, _getContentLastUpdatedTimestamp["default"])());
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=keepalive.js.map