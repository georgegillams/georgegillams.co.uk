"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _url = require("url");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _helpers = require("./helpers");

var _potConfigs = _interopRequireDefault(require("./potConfigs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function loadLatestTransactions(req) {
  return new Promise(function (resolve, reject) {
    (0, _helpers.authMonzo)(req.body.password).then(function (authResult) {
      if (authResult.error || authResult.warning) {
        resolve(authResult);
        return;
      }

      (0, _helpers.loadPotData)(req.body.password).then(function (potData) {
        if (potData.error || potData.warning) {
          resolve(potData);
          return;
        }

        (0, _nodeFetch["default"])('https://api.monzo.com/accounts', {
          method: 'get',
          headers: {
            Authorization: "Bearer ".concat(authResult.accessToken.key)
          }
        }).then(function (res) {
          return res.json();
        }).then(function (accountData) {
          var accountID = accountData.accounts.find(function (a) {
            return a.type === 'uk_retail';
          }).id;
          var params = new _url.URLSearchParams();
          params.append('account_id', accountID);

          var potConfigsAnnotated = _potConfigs["default"].map(function (pc) {
            var pot = potData.find(function (p) {
              return p.name === pc.name && !p.deleted;
            });

            if (!pot) {
              return pc;
            }

            var potId = pot.id;
            return _objectSpread({}, pc, {
              potId: potId
            });
          });

          (0, _nodeFetch["default"])("https://api.monzo.com/transactions?".concat(params.toString()), {
            method: 'GET',
            headers: {
              Authorization: "Bearer ".concat(authResult.accessToken.key)
            }
          }).then(function (res) {
            return res.json();
          }).then(function (transactionData) {
            var potTransfers = [];

            if (transactionData && transactionData.transactions && transactionData.transactions.filter) {
              potTransfers = transactionData.transactions.filter(function (t) {
                var potOfInterest = false;
                potConfigsAnnotated.forEach(function (pc) {
                  if (pc.potId === t.metadata.pot_id) {
                    potOfInterest = true;
                  }
                });
                return t.scheme === 'uk_retail_pot' && potOfInterest;
              });
              potTransfers = potTransfers.reverse().map(function (p) {
                var potName = potConfigsAnnotated.find(function (pc) {
                  return pc.potId === p.metadata.pot_id;
                }).name;
                return {
                  amount: p.amount,
                  potName: potName,
                  created: p.created
                };
              });
            }

            var potWithdrawals = potTransfers.filter(function (pt) {
              return pt.amount > 0;
            });
            var potDeposits = potTransfers.filter(function (pt) {
              return pt.amount < 0;
            });

            var processedData = _potConfigs["default"].map(function (pc) {
              var matchingWithdrawal = potWithdrawals.find(function (pw) {
                return pw.potName === pc.name;
              });
              var matchingDeposit = potDeposits.find(function (pw) {
                return pw.potName === pc.name;
              });
              return {
                name: pc.name,
                lastDeposit: (0, _helpers.formatTransaction)(matchingDeposit),
                lastWithdrawal: (0, _helpers.formatTransaction)(matchingWithdrawal)
              };
            });

            resolve(processedData);
          }, function (err) {
            return reject(err);
          });
        }, function (err) {
          return reject(err);
        });
      }, function (err) {
        return reject(err);
      });
    }, function (err) {
      return reject(err);
    });
  });
}

var _default = loadLatestTransactions;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=loadLatestTransactions.js.map