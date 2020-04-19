"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getContentLastUpdatedTimestamp;

var _datum = require("../actions/datum");

function getContentLastUpdatedTimestamp() {
  return new Promise(function (resolve) {
    (0, _datum.datumLoad)({
      redisKey: 'contentUpdates'
    }).then(function (contentUpdateData) {
      if (contentUpdateData && contentUpdateData.length > 0) {
        // In the interest of reducing traffic, only send the raw timestamp value
        resolve(contentUpdateData[0].lastUpdatedTimestamp);
      } else {
        resolve(1);
      }
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=getContentLastUpdatedTimestamp.js.map