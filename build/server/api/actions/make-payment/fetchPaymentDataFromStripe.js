"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetchPaymentDataFromStripe;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _stripe = _interopRequireDefault(require("./stripe"));

var _formatStripeError = _interopRequireDefault(require("./formatStripeError"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getPaymentIntent = function getPaymentIntent(paymentIntentId) {
  return new Promise(function (resolve, reject) {
    if (paymentIntentId) {
      resolve(_stripe["default"].paymentIntents.retrieve(paymentIntentId));
    } else {
      resolve(null);
    }
  });
};

function fetchPaymentDataFromStripe(stripePayments) {
  return new Promise(function (resolve, reject) {
    var stripePaymentIntentPromises = stripePayments.map(function (sp) {
      return new Promise(function (res, rej) {
        // get paid amount from stripe's server
        getPaymentIntent(sp.paymentIntentId).then(function (paymentIntent) {
          res(_objectSpread({}, paymentIntent, {
            stripepayment: sp
          }));
        })["catch"](function (err) {
          rej((0, _formatStripeError["default"])(err));
        });
      });
    });
    Promise.all(stripePaymentIntentPromises).then(function (stripePaymentIntents) {
      resolve(stripePaymentIntents);
    })["catch"](function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=fetchPaymentDataFromStripe.js.map