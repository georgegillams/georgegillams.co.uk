"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadInfo;

function loadInfo() {
  return new Promise(function (resolve) {
    resolve({
      message: 'This came from the api server',
      time: Date.now()
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loadInfo.js.map