"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getmagiclink;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find2 = require("utils/find");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _emailHelpers = require("utils/emailHelpers");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function getmagiclink(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve) {
    (0, _authentication["default"])(req).then(function (user) {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        var _find = (0, _find2.find)(userData, reqSecured.body.email.toLowerCase(), 'email'),
            userProfile = _find.existingValue;

        if (userProfile) {
          var divertToAdmin = user && user.admin && reqSecured.body.divertToAdmin;
          (0, _emailHelpers.sendMagicLinkEmail)(userProfile, divertToAdmin, reqSecured.body.loginRedirect);
        }

        resolve({
          success: 'A magic link has been generated and sent to the email associated with your account'
        });
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=getmagiclink.js.map