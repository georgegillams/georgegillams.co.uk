"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./usersAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _hash = require("utils/hash");

var _find3 = require("utils/find");

var _emailHelpers = require("utils/emailHelpers");

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _login = _interopRequireDefault(require("utils/login"));

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        // Only admins can create admins!
        if (user && user.admin || !reqSecured.body.admin) {
          // If a user already has the username, we cannot allow a new one to be created
          var _find = (0, _find3.find)(userData, reqSecured.body.uname, 'uname'),
              userWithSameUname = _find.existingValue;

          var _find2 = (0, _find3.find)(userData, (0, _find3.emailFingerprint)(reqSecured.body.email), 'emailFingerprint'),
              userWithSameEmail = _find2.existingValue;

          if (userWithSameUname || userWithSameEmail) {
            reject({
              error: 'A user with that username or email already exists',
              reason: 'A user with that username already exists'
            });
          } else {
            if (reqSecured.body.password) {
              reqSecured.body.hash = (0, _hash.hash)(reqSecured.body.password);
              reqSecured.body.password = null;
            }

            reqSecured.body.emailFingerprint = (0, _find3.emailFingerprint)(reqSecured.body.email);
            reqSecured.body.email = reqSecured.body.email.toLowerCase();
            reqSecured.body.emailVerified = false;
            (0, _datum.datumCreate)({
              redisKey: 'users',
              user: user
            }, reqSecured).then(function (newUser) {
              (0, _emailHelpers.sendEmailVerificationEmail)(newUser);
              (0, _login["default"])(reqSecured, newUser, resolve, reject);
              resolve({
                message: 'User created'
              });
            });
          }
        } else {
          reject(_constants.UNAUTHORISED_WRITE);
        }
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map