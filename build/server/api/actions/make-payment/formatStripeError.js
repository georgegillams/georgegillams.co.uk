"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var formatStripeError = function formatStripeError(err) {
  var error = err;

  if (error.raw.message) {
    error = {
      error: 'network',
      errorMessage: error.raw.message
    };
  }

  return error;
};

var _default = formatStripeError;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=formatStripeError.js.map