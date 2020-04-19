"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var commentsAllowedAttributes = [{
  attribute: 'amount',
  pattern: _constants.DECIMAL_REGEX
}, {
  attribute: 'email',
  pattern: _constants.EMAIL_REGEX
}, {
  attribute: 'paymentId',
  pattern: _constants.ID_REGEX
}];
var _default = commentsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=paymentsAllowedAttributes.js.map