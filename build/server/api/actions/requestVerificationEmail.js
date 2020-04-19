"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = requestVerificationEmail;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find = require("utils/find");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _emailHelpers = require("utils/emailHelpers");

var _constants = require("helpers/constants");

function requestVerificationEmail(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user) {
        (0, _emailHelpers.sendEmailVerificationEmail)(user);
        resolve('Verification email resent');
      } else {
        reject(_constants.UNAUTHORISED_WRITE);
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=requestVerificationEmail.js.map