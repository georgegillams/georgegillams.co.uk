#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _load = _interopRequireDefault(require("./load.js"));

var _datum = require("../datum");

test('returns error if not authenticated', function (done) {
  var req = {
    cookies: {},
    headers: {},
    body: {}
  };
  (0, _load["default"])(req).then(function (result) {})["catch"](function (result) {
    expect(result.error).toBe('auth');
    expect(result.errorMessage).toBe('You are not authorised to read this resource');
    done();
  });
});
//# sourceMappingURL=load.test.js.map