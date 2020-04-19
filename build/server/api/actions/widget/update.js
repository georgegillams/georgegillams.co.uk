"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;

var _load = _interopRequireDefault(require("./load"));

function update(req) {
  return new Promise(function (resolve, reject) {
    // write to database
    setTimeout(function () {
      if (Math.random() < 0.2) {
        reject('Oh no! Widget save fails 20% of the time. Try again.');
      } else {
        (0, _load["default"])(req).then(function (data) {
          var widgets = data;
          var widget = req.body;

          if (widget.color === 'Green') {
            reject({
              color: 'We do not accept green widgets' // example server-side validation error

            });
          }

          if (widget.id) {
            widgets[widget.id - 1] = widget; // id is 1-based. please don't code like this in production! :-)

            req.session.widgets = widgets;
          }

          resolve(widget);
        }, function (err) {
          reject(err);
        });
      }
    }, 1500); // simulate async db write
  });
}

module.exports = exports.default;
//# sourceMappingURL=update.js.map