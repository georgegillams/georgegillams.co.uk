"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createIntent;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _datum = require("../datum");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _stripePaymentsAllowedAttributes = _interopRequireDefault(require("./stripePaymentsAllowedAttributes"));

var _stripe = _interopRequireDefault(require("./stripe"));

var _load = _interopRequireDefault(require("./load"));

var _formatStripeError = _interopRequireDefault(require("./formatStripeError"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createNewPaymentIntent = function createNewPaymentIntent(payment) {
  return new Promise(function (resolve, reject) {
    if (payment.outstandingBalance < 30 && payment.outstandingBalance > 1000000) {
      resolve({
        id: null,
        client_secret: null
      });
    } else {
      resolve(_stripe["default"].paymentIntents.create({
        amount: payment.outstandingBalance,
        currency: 'gbp'
      }));
    }
  });
};

function createIntent(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _stripePaymentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _load["default"])(reqSecured).then(function (payment) {
      createNewPaymentIntent(payment).then(function (paymentIntent) {
        (0, _datum.datumCreate)({
          redisKey: 'stripepayments'
        }, {
          body: {
            paymentId: payment.id,
            paymentIntentId: paymentIntent.id,
            paymentIntentClientSecret: paymentIntent.client_secret
          }
        }).then(function () {
          resolve(_objectSpread({}, payment, {
            paymentIntentClientSecret: paymentIntent.client_secret
          }));
        })["catch"](function (err) {
          reject(err);
        });
      })["catch"](function (err) {
        reject((0, _formatStripeError["default"])(err));
      });
    })["catch"](function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=createIntent.js.map