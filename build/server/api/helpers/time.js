"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimeDifference = void 0;

var _moment = _interopRequireDefault(require("moment"));

var getTimeDifference = function getTimeDifference(timeStamp) {
  if (timeStamp > 9000000000000000) {
    return '5 years';
  }

  return (0, _moment["default"])(timeStamp).fromNow();
};

exports.getTimeDifference = getTimeDifference;
var _default = {
  getTimeDifference: getTimeDifference
};
exports["default"] = _default;
//# sourceMappingURL=time.js.map