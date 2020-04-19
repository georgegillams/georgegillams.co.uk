"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPotData = loadPotData;
exports.getMonthsElapsedPercentage = getMonthsElapsedPercentage;
exports.authMonzo = authMonzo;
exports.formatTransaction = formatTransaction;
exports["default"] = void 0;

var _safeCompare = _interopRequireDefault(require("safe-compare"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _moment = _interopRequireDefault(require("moment"));

var _datum = require("../../actions/datum");

var _time = require("helpers/time");

var _potConfigs = _interopRequireDefault(require("./potConfigs"));

function formatTransaction(transaction) {
  if (!transaction) {
    return null;
  }

  return {
    amount: Math.abs(transaction.amount),
    time: (0, _time.getTimeDifference)(transaction.created)
  };
}

function getMonthsElapsedPercentage(potConfig) {
  if (potConfig.monthly) {
    return 0;
  }

  var config = _potConfigs["default"].filter(function (p) {
    return p.name === potConfig.name;
  })[0];

  var result = (0, _moment["default"])().diff(config.startDate, 'months');
  return Math.min(100, result * 100 / 12);
}

function authMonzo(password) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoadSingle)({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp'
    }).then(function (accessToken) {
      var accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        reject({
          error: 'auth',
          errorMessage: 'No access token configured'
        });
        return;
      }

      if (!password || !(0, _safeCompare["default"])(password, accessPassword)) {
        reject({
          error: 'auth',
          errorMessage: 'Access password incorrect.'
        });
        return;
      }

      (0, _nodeFetch["default"])('https://api.monzo.com/pots', {
        method: 'get',
        headers: {
          Authorization: "Bearer ".concat(accessToken.key)
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (!data || !data.pots) {
          resolve({
            error: 'The Monzo token has expired. Tell George to generate a new one.'
          });
          return;
        }

        resolve({
          accessToken: accessToken
        });
      });
    });
  });
}

function loadPotData(password) {
  return new Promise(function (resolve, reject) {
    authMonzo(password).then(function (authResult) {
      if (authResult.error || authResult.warning) {
        resolve(authResult);
        return;
      }

      (0, _nodeFetch["default"])('https://api.monzo.com/pots', {
        method: 'get',
        headers: {
          Authorization: "Bearer ".concat(authResult.accessToken.key)
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (!data || !data.pots) {
          reject({
            error: 'auth',
            errorMessage: 'The Monzo token has expired. Tell George to generate a new one.'
          });
          return;
        }

        resolve(data.pots);
      });
    }, function (err) {
      return reject(err);
    });
  });
}

var _default = authMonzo;
exports["default"] = _default;
//# sourceMappingURL=helpers.js.map