"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.inferConstantsFromActionDefinitions = exports.generateConstantValue = exports.defineConstants = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var generateConstantValue = function generateConstantValue(constantName) {
  return "".concat(constantName, "-").concat(_crypto["default"].randomBytes(6).toString('hex'));
};

exports.generateConstantValue = generateConstantValue;

var defineConstants = function defineConstants() {
  var result = {};

  for (var i = 0; i < arguments.length; i += 1) {
    var constantName = i < 0 || arguments.length <= i ? undefined : arguments[i];
    result[constantName] = generateConstantValue(constantName);
  }

  return result;
};

exports.defineConstants = defineConstants;

var inferConstantsFromActionDefinitions = function inferConstantsFromActionDefinitions(defs) {
  var result = [];

  for (var i = 0; i < defs.length; i += 1) {
    result.push(Object.keys(defs[i])[0]);
  }

  return result;
};

exports.inferConstantsFromActionDefinitions = inferConstantsFromActionDefinitions;
var _default = defineConstants;
exports["default"] = _default;
//# sourceMappingURL=constants.js.map