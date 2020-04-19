"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("helpers/constants");

var usersAllowedAttributes = [{
  attribute: 'name',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'magicLinkKey',
  pattern: _constants.ID_REGEX
}, {
  attribute: 'uname',
  pattern: _constants.UNAME_REGEX
}, {
  attribute: 'email',
  pattern: _constants.EMAIL_REGEX
}, {
  attribute: 'admin',
  pattern: 'BOOL'
}, {
  attribute: 'divertToAdmin',
  pattern: 'BOOL'
}, {
  attribute: 'password',
  pattern: _constants.PASSWORD_REGEX
}, {
  attribute: 'ticketType',
  pattern: _constants.PASSWORD_REGEX
}, {
  attribute: 'loginRedirect',
  pattern: _constants.REDIRECT_REGEX
}];
var _default = usersAllowedAttributes;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=usersAllowedAttributes.js.map