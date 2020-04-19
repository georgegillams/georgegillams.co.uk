"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = performRestoration;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _redis = _interopRequireDefault(require("utils/redis"));

function performRestoration(data) {
  return new Promise(function (resolve, reject) {
    var promises = [];
    Object.keys(data).forEach(function (key) {
      promises.push(new Promise(function (res, rej) {
        _redis["default"].del(key);

        if (data[key].length > 0) {
          var newData = data[key].map(function (d) {
            return JSON.stringify(d);
          });

          _redis["default"].rpush([key].concat((0, _toConsumableArray2["default"])(newData)));
        }

        res(true);
      }));
    });
    Promise.all(promises).then(function () {
      resolve(true);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=performRestoration.js.map