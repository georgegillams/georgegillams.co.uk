"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getJsonFromScannedData = void 0;

var getJsonFromScannedData = function getJsonFromScannedData(data) {
  try {
    return JSON.parse(data.split("'").join('"').split("'").join('"'));
  } catch (err) {
    return null;
  }
};

exports.getJsonFromScannedData = getJsonFromScannedData;
var _default = {
  getJsonFromScannedData: getJsonFromScannedData
};
exports["default"] = _default;
//# sourceMappingURL=qrCodes.js.map