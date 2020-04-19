"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var commentsAllowedAttributes = [{
  attribute: 'paymentToken',
  pattern: _constants.PASSWORD_REGEX
}, {
  attribute: 'paymentAmount',
  pattern: _constants.INT_REGEX
}, {
  attribute: 'paymentId',
  pattern: _constants.ID_REGEX
}, {
  attribute: 'resendId',
  pattern: _constants.ID_REGEX
}];
var _default = commentsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=stripePaymentsAllowedAttributes.js.map