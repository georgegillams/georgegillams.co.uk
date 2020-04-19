"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getPaymentAndBalance;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _datum = require("../datum");

var _fetchPaymentDataFromStripe = _interopRequireDefault(require("./fetchPaymentDataFromStripe"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getPaymentAndBalance(paymentId) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoadSingle)({
      redisKey: 'payments',
      filter: function filter(p) {
        return p.id === paymentId;
      }
    }).then(function (payment) {
      (0, _datum.datumLoad)({
        redisKey: 'stripepayments',
        filter: function filter(sp) {
          return sp.paymentId === payment.id;
        }
      }).then(function (stripePayments) {
        var outstandingBalance = payment.amount;
        (0, _fetchPaymentDataFromStripe["default"])(stripePayments).then(function (stripePaymentIntents) {
          stripePaymentIntents.forEach(function (paymentIntent) {
            if (paymentIntent) {
              paymentIntent.charges.data.forEach(function (d) {
                if (d.paid) {
                  outstandingBalance -= d.amount;
                }
              });
            }
          });
          resolve(_objectSpread({}, payment, {
            amount: Math.round(payment.amount),
            outstandingBalance: Math.round(outstandingBalance)
          }));
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
//# sourceMappingURL=getPaymentAndBalance.js.map