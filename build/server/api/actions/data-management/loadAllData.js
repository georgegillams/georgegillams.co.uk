"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadAllData;

var _constants = require("helpers/constants");

var _datum = require("../datum");

function loadAllData() {
  return new Promise(function (resolve, reject) {
    var data = {};
    var loadPromises = [];

    _constants.REDIS_INFORMATION_STORES.forEach(function (redisKey) {
      loadPromises.push(new Promise(function (res) {
        (0, _datum.datumLoad)({
          redisKey: redisKey,
          includeDeleted: true
        }).then(function (loadedData) {
          data[redisKey] = loadedData;
          res();
        });
      }));
    });

    Promise.all(loadPromises).then(function () {
      resolve(data);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loadAllData.js.map