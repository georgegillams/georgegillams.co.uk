"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _grammarMLAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      var text = reqSecured.body.text;
      var sentences = text.split('.').join('.SPLIT_HERE').split('?').join('?SPLIT_HERE').split('!').join('!SPLIT_HERE').split('SPLIT_HERE');
      var tasks = sentences.filter(function (s) {
        return s !== '' && (s.toLowerCase().includes('there') || s.toLowerCase().includes('their'));
      }).map(function (s) {
        return new Promise(function (res) {
          (0, _datum.datumCreate)({
            redisKey: 'grammarML',
            user: user
          }, {
            body: {
              text: s.trim()
            }
          }).then(function (r) {
            return res(r);
          });
        });
      });
      Promise.all(tasks).then(function (result) {
        resolve(result);
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map