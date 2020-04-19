"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareHash = compareHash;
exports.hash = hash;
exports.generateKey = generateKey;

var _crypto = _interopRequireDefault(require("crypto"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function compareHash(password, credentialHash) {
  var result = _bcrypt["default"].compareSync(password, credentialHash);

  return result;
}

function hash(password) {
  var result = _bcrypt["default"].hashSync(password, 10);

  return result;
}

function generateKey() {
  return _crypto["default"].randomBytes(20).toString('hex');
}
//# sourceMappingURL=hash.js.map