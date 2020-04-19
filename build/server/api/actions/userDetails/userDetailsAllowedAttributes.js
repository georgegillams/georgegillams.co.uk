"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var commentsAllowedAttributes = [{
  attribute: 'name',
  pattern: _constants.NAME_REGEX
}, {
  attribute: 'surname',
  pattern: _constants.NAME_REGEX
}, {
  attribute: 'returningDelegate',
  pattern: 'BOOL'
}, {
  attribute: 'university',
  pattern: _constants.NAME_REGEX
}, {
  attribute: 'degreeCourse',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'yearOfStudy',
  pattern: _constants.INT_REGEX
}, {
  attribute: 'dietaryRequirements',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'alergies',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'otherRequirements',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'photoReleaseConsented',
  pattern: 'BOOL'
}, {
  attribute: 'photoReleaseConsented',
  pattern: 'BOOL'
}, {
  attribute: 'paymentToken',
  pattern: _constants.PASSWORD_REGEX
}, {
  attribute: 'paymentAmount',
  pattern: _constants.INT_REGEX
}];
var _default = commentsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=userDetailsAllowedAttributes.js.map