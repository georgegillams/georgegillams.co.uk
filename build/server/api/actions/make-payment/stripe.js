"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var _constants = require("helpers/constants");

var stripeInstance = (0, _stripe["default"])(_constants.STRIPE_SECRET_API_KEY);
var _default = stripeInstance;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=stripe.js.map