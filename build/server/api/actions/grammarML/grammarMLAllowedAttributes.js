"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var grammarMLAllowedAttributes = [{
  attribute: 'text',
  pattern: _constants.ANYTHING_REGEX
}, {
  attribute: 'ratio',
  pattern: _constants.DECIMAL_REGEX
}];
var _default = grammarMLAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=grammarMLAllowedAttributes.js.map