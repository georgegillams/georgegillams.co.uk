"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _loadAllData = _interopRequireDefault(require("./loadAllData"));

var _fs = _interopRequireDefault(require("fs"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var dataFilePath = 'server/server_content/data.json';

function load(req) {
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(req).then(function (user) {
      if (user && user.admin) {
        (0, _loadAllData["default"])().then(function (data) {
          var dataAnnotated = {
            projectName: _constants.PROJECT_NAME,
            timestamp: Date.now(),
            data: data
          };
          resolve(function (res) {
            _fs["default"].writeFileSync(dataFilePath, JSON.stringify(dataAnnotated));

            res.download(dataFilePath);
          });
        });
      } else {
        reject(_constants.UNAUTHORISED_READ);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=backup.js.map