#!/usr/bin/env node
// eslint-disable-next-line
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _selectors = _interopRequireWildcard(require("./selectors.js"));

test('correctly creates selectors from state entities', function (done) {
  var testEntities = ['propertyUno', 'propertyDos'];
  var selectors = (0, _selectors["default"])('statePrefix', testEntities);
  var selectorFunctionNames = Object.keys(selectors);
  expect(selectorFunctionNames.length).toBe(2);
  expect(selectorFunctionNames[0]).toEqual('makeSelectPropertyUno');
  expect(selectorFunctionNames[1]).toEqual('makeSelectPropertyDos');
  expect((0, _typeof2["default"])(selectors[selectorFunctionNames[0]])).toEqual('function');
  expect((0, _typeof2["default"])(selectors[selectorFunctionNames[1]])).toEqual('function');
  done();
});
test('correctly maps selectors', function (done) {
  var testEntities = ['propertyUno', 'propertyDos'];
  var selectors = (0, _selectors["default"])('statePrefix', testEntities);
  var mappedSelectors = (0, _selectors.mapSelectors)(selectors);
  var mappedSelectorNames = Object.keys(mappedSelectors);
  expect(mappedSelectorNames.length).toBe(2);
  expect(mappedSelectorNames[0]).toEqual('propertyUno');
  expect(mappedSelectorNames[1]).toEqual('propertyDos');
  done();
});
//# sourceMappingURL=selectors.test.js.map