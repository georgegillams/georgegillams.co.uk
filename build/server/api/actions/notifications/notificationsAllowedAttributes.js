"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var notificationsAllowedAttributes = [{
  attribute: 'type',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'message',
  pattern: _constants.MD_COMPLETE_REGEX
}];
var _default = notificationsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=notificationsAllowedAttributes.js.map