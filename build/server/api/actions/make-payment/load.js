"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadSingle;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _stripePaymentsAllowedAttributes = _interopRequireDefault(require("./stripePaymentsAllowedAttributes"));

var _getPaymentAndBalance = _interopRequireDefault(require("./getPaymentAndBalance"));

var _sendUnsentPaymentReceipts = _interopRequireDefault(require("./sendUnsentPaymentReceipts"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function loadSingle(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _stripePaymentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _getPaymentAndBalance["default"])(reqSecured.body.paymentId).then(function (payment) {
      (0, _sendUnsentPaymentReceipts["default"])(payment).then(function () {
        resolve(_objectSpread({}, payment, {
          email: 'REDACTED'
        }));
      })["catch"](function (err) {
        reject(err);
      });
    })["catch"](function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map