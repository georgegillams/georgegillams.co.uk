"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var commentsAllowedAttributes = [{
  attribute: 'pageId',
  pattern: _constants.ID_REGEX
}, {
  attribute: 'displayName',
  pattern: _constants.UNAME_REGEX
}, {
  attribute: 'comment',
  pattern: _constants.MD_PARTIAL_REGEX
}];
var _default = commentsAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=commentsAllowedAttributes.js.map