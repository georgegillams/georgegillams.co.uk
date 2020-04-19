"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ghOrgData;

function ghOrgData() {
  return new Promise(function (resolve) {
    resolve({
      message: 'Getting data from GitHub',
      time: Date.now()
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=ghOrgData.js.map