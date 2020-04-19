"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setContentLastUpdatedTimestamp;

var _datum = require("../actions/datum");

function setContentLastUpdatedTimestamp() {
  var newContentUpdateData = {};
  (0, _datum.datumLoad)({
    redisKey: 'contentUpdates'
  }).then(function (contentUpdateData) {
    if (contentUpdateData && contentUpdateData.length > 0) {
      newContentUpdateData = contentUpdateData[0];
      newContentUpdateData.lastUpdatedTimestamp = Date.now().toString();
      (0, _datum.datumUpdate)({
        redisKey: 'contentUpdates'
      }, {
        body: newContentUpdateData
      });
    } else {
      (0, _datum.datumCreate)({
        redisKey: 'contentUpdates'
      }, {
        body: {
          lastUpdatedTimestamp: Date.now()
        }
      });
    }
  });
}

module.exports = exports.default;
//# sourceMappingURL=setContentLastUpdatedTimestamp.js.map