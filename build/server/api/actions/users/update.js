"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;

var _datum = require("../datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./usersAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _hash = require("utils/hash");

var _find2 = require("utils/find");

var _userOwnsResource = require("utils/userOwnsResource");

var _emailHelpers = require("utils/emailHelpers");

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function update(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      (0, _userOwnsResource.userOwnsResource)('users', reqSecured.body.id, user).then(function (userOwnsResourceResult) {
        (0, _datum.datumLoad)({
          redisKey: 'users'
        }).then(function (userData) {
          var _find = (0, _find2.find)(userData, reqSecured.body.id),
              userBeingUpdated = _find.existingValue; // Users should be able to update their own user


          if (!userBeingUpdated) {
            reject(_constants.RESOURCE_NOT_FOUND);
            return;
          }

          if (!user) {
            reject(_constants.UNAUTHORISED_WRITE);
            return;
          } // The user editing must either be the user themselves, or an admin


          if (!user.admin && !userOwnsResourceResult) {
            reject(_constants.UNAUTHORISED_WRITE);
            return;
          } // Only admins can upgrade someone to being admins!


          if (reqSecured.body.admin && (!user || !user.admin)) {
            reject(_constants.UNAUTHORISED_WRITE);
            return;
          }

          var otherUsersWithSameUname = userData.filter(function (u) {
            return u.uname === reqSecured.body.uname && u.id !== reqSecured.body.id;
          }); // If another user already with the same username, we cannot allow it to be updated, as usernames must be unique

          if (otherUsersWithSameUname.length > 0) {
            reject({
              error: 'user already exists',
              errorMessage: 'A user with that username already exists'
            });
            return;
          }

          if (reqSecured.body.password) {
            reqSecured.body.hash = (0, _hash.hash)(reqSecured.body.password);
            reqSecured.body.password = null;
          } else {
            reqSecured.body.hash = userBeingUpdated.hash;
          } // IF USER EMAIL HAS CHANGED, IT NEED RE-VERIFYING


          var emailVerificationRequired = reqSecured.body.email !== userBeingUpdated.email;

          if (emailVerificationRequired) {
            reqSecured.body.email = reqSecured.body.email.toLowerCase();
            reqSecured.body.emailVerified = false;
            reqSecured.body.emailFingerprint = (0, _find2.emailFingerprint)(reqSecured.body.email);
          } else {
            reqSecured.body.emailFingerprint = userBeingUpdated.emailFingerprint;
            reqSecured.body.emailVerified = userBeingUpdated.emailVerified;
          }

          (0, _datum.datumUpdate)({
            redisKey: 'users'
          }, reqSecured).then(function (updatedUser) {
            if (emailVerificationRequired) {
              (0, _emailHelpers.sendEmailVerificationEmail)(updatedUser);
            }

            resolve(updatedUser);
          });
        });
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=update.js.map