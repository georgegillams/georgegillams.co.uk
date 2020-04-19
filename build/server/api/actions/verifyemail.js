"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = verifyemail;

var _datum = require("../actions/datum");

var _find3 = require("utils/find");

function verifyemail(req) {
  return new Promise(function (resolve, reject) {
    var verificationKey = req.body.verificationKey;
    (0, _datum.datumLoad)({
      redisKey: 'emailVerificationCodes'
    }).then(function (emailVerificationData) {
      // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
      var _find = (0, _find3.find)(emailVerificationData, verificationKey, 'key'),
          emailVerification = _find.existingValue;

      if (emailVerification) {
        if (Date.now() < new Date(emailVerification.expiry).getTime()) {
          // invalidate magic link (set expiry to 0)
          emailVerification.expiry = 0;
          (0, _datum.datumUpdate)({
            redisKey: 'emailVerificationCodes'
          }, {
            body: emailVerification
          });
          (0, _datum.datumLoad)({
            redisKey: 'users'
          }).then(function (userData) {
            var _find2 = (0, _find3.find)(userData, emailVerification.userId),
                user = _find2.existingValue;

            if (user) {
              user.emailVerified = true;
              resolve((0, _datum.datumUpdate)({
                redisKey: 'users'
              }, {
                body: user
              }));
            } else {
              reject({
                error: 'wrong-input',
                errorMessage: 'Invalid user'
              });
            }
          });
        } else {
          reject({
            error: 'wrong-input',
            errorMessage: 'Email verification link has expired'
          });
        }
      } else {
        reject({
          error: 'wrong-input',
          errorMessage: 'Invalid verification link'
        });
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=verifyemail.js.map