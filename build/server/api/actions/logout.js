"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = logout;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find2 = require("utils/find");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function logout(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoad)({
      redisKey: 'sessions'
    }).then(function (sessionData) {
      var _find = (0, _find2.find)(sessionData, reqSecured.cookies.session, 'sessionKey'),
          session = _find.existingValue;

      if (session) {
        session.userId = null;
        session.userAuthenticatedTimestamp = null;
        resolve((0, _datum.datumUpdate)({
          redisKey: 'sessions'
        }, {
          body: session
        }));
        resolve({
          success: 'You are now logged out'
        });
        (0, _setContentLastUpdatedTimestamp["default"])();
      } else {
        reject({
          error: 'Invalid session. Try clearing cookies for this site and then re-authenticate'
        });
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=logout.js.map