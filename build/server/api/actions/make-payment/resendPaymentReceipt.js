"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = resendPaymentReceipt;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _emailHelpers = require("utils/emailHelpers");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _find3 = require("utils/find");

var _constants = require("helpers/constants");

var _stripePaymentsAllowedAttributes = _interopRequireDefault(require("./stripePaymentsAllowedAttributes"));

function resendPaymentReceipt(req) {
  // TODO rewrite to use payment email
  var reqSecured = (0, _reqSecure["default"])(req, _stripePaymentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        var userIdToResendTo = reqSecured.body.resendId;
        (0, _datum.datumLoad)({
          redisKey: 'users'
        }).then(function (userData) {
          (0, _datum.datumLoad)({
            redisKey: 'stripepayments'
          }).then(function (paymentData) {
            var _find = (0, _find3.find)(paymentData, userIdToResendTo, 'authorId'),
                paymentToResend = _find.existingValue;

            var _find2 = (0, _find3.find)(userData, userIdToResendTo),
                existingUser = _find2.existingValue;

            if (existingUser && paymentToResend) {
              (0, _emailHelpers.sendPaymentReceiptEmail)(existingUser, paymentToResend);
            }
          });
        });
      } else {
        reject(_constants.UNAUTHORISED_READ);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=resendPaymentReceipt.js.map