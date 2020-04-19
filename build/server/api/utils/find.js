"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.emailFingerprint = emailFingerprint;

var _safeCompare = _interopRequireDefault(require("safe-compare"));

function find(values, id) {
  var matchOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  var existingValue = null;
  var existingValueIndex = -1;

  for (var it = 0; it < values.length; it += 1) {
    var valueToMatch = values[it][matchOn] || 'UNDEFINED_VALUE';
    var idToMatch = id || 'UNDEFINED_ID';

    if (matchOn === 'email') {
      valueToMatch = valueToMatch.toLowerCase();
      idToMatch = idToMatch.toLowerCase();
    }

    if ((0, _safeCompare["default"])(valueToMatch, idToMatch)) {
      existingValue = values[it];
      existingValueIndex = it;
    }
  }

  return {
    existingValue: existingValue,
    existingValueIndex: existingValueIndex
  };
}

function emailFingerprint(emailAddress) {
  var emailSplit = emailAddress.split('@');
  var user = emailSplit[0].split('.').join('');
  user = user.split('+')[0];
  var emailDomain = emailSplit[1];
  return "".concat(user, "@").concat(emailDomain);
}
//# sourceMappingURL=find.js.map