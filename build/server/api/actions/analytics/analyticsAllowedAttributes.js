"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var analyticsAllowedAttributes = [{
  attribute: 'type',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'url',
  pattern: _constants.ANYTHING_REGEX
}, {
  attribute: 'utm_source',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'utm_medium',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'browser',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'browserVersion',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'os',
  pattern: _constants.STRING_REGEX
}];
var _default = analyticsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=analyticsAllowedAttributes.js.map