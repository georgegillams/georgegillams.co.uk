"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendUnsentPaymentReceipts;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _datum = require("../datum");

var _emailHelpers = require("utils/emailHelpers");

var _fetchPaymentDataFromStripe = _interopRequireDefault(require("./fetchPaymentDataFromStripe"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var markStripePaymentEmailSent = function markStripePaymentEmailSent(id, newValue) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoadSingle)({
      redisKey: 'stripepayments',
      filter: function filter(sp) {
        return sp.id === id;
      }
    }).then(function (stripepayment) {
      resolve((0, _datum.datumUpdate)({
        redisKey: 'stripepayments'
      }, {
        body: _objectSpread({}, stripepayment, {
          emailSent: newValue
        })
      }));
    })["catch"](function (err) {
      reject(err);
    });
  });
};

function sendUnsentPaymentReceipts(payment) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoad)({
      redisKey: 'stripepayments',
      filter: function filter(sp) {
        return sp.paymentId === payment.id && !sp.emailSent;
      }
    }).then(function (stripePayments) {
      (0, _fetchPaymentDataFromStripe["default"])(stripePayments).then(function (paymentIntents) {
        var sendEmailPromises = [];
        paymentIntents.forEach(function (pI) {
          if (pI) {
            var emailSentNewValue = true;
            pI.charges.data.forEach(function (pICD) {
              if (pICD.amount > 0) {
                emailSentNewValue = (0, _emailHelpers.sendPaymentReceiptEmail)(payment, pICD);
              }
            });
            sendEmailPromises.push(markStripePaymentEmailSent(pI.stripepayment.id, emailSentNewValue));
          }
        });
        Promise.all(sendEmailPromises).then(function () {
          resolve();
        })["catch"](function (err) {
          reject(err);
        });
      })["catch"](function (err) {
        reject(err);
      });
    })["catch"](function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=sendUnsentPaymentReceipts.js.map