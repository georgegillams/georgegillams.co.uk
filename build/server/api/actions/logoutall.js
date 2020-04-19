"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = logoutall;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function logoutall(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user) {
        (0, _datum.datumLoad)({
          redisKey: 'sessions'
        }).then(function (sessionData) {
          for (var it = 0; it < sessionData.length; it += 1) {
            var session = sessionData[it];

            if (session.userId === user.id) {
              session.userId = null;
              session.userAuthenticatedTimestamp = null;
              resolve((0, _datum.datumUpdate)({
                redisKey: 'sessions'
              }, {
                body: session
              }));
              (0, _setContentLastUpdatedTimestamp["default"])();
            }
          }
        });
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=logoutall.js.map