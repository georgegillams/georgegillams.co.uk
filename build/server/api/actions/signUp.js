"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = signUp;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find3 = require("utils/find");

var _constants = require("helpers/constants");

var _hash = require("utils/hash");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _login = _interopRequireDefault(require("utils/login"));

var _emailHelpers = require("utils/emailHelpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var usernameTakenErrorMessage = _objectSpread({}, _constants.EMAIL_TAKEN, {
  errorMessage: 'Username already taken.'
});

function signUp(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    (0, _datum.datumLoad)({
      redisKey: 'users'
    }).then(function (userData) {
      var _find = (0, _find3.find)(userData, reqSecured.body.email.toLowerCase(), 'email'),
          userWithSameEmail = _find.existingValue;

      var _find2 = (0, _find3.find)(userData, reqSecured.body.uname, 'uname'),
          userWithSameUname = _find2.existingValue;

      if (userWithSameEmail) {
        reject(_constants.EMAIL_TAKEN);
      } else if (userWithSameUname && _constants.USERNAMES_ENABLED) {
        reject(usernameTakenErrorMessage);
      } else {
        (0, _datum.datumCreate)({
          redisKey: 'users'
        }, reqSecured).then(function (createdUser) {
          (0, _login["default"])(reqSecured, createdUser).then(function (loginResult) {
            (0, _emailHelpers.sendEmailVerificationEmail)(loginResult);
            resolve(loginResult);
          });
        });
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=signUp.js.map