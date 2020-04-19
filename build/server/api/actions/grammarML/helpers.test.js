#!/usr/bin/env node
// eslint-disable-next-line
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsRegression = _interopRequireDefault(require("js-regression"));

var _winkPerceptron = _interopRequireDefault(require("wink-perceptron"));

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _helpers = require("./helpers");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

test('correctly annotates sentences', function (done) {
  var testData = [{
    text: 'Put their stuff away.'
  }];
  var annotated = (0, _helpers.annotateSentences)(testData);
  expect(annotated.length).toBe(1);
  expect(annotated[0].wordLength).toBe(4);
  expect(annotated[0].charLength).toBe(21);
  expect(annotated[0].endingCharacter).toBe(46);
  expect(annotated[0].label).toEqual(_helpers.THEIR_VALUE);
  expect(annotated[0].charPositionOfTheire).toBe(4);
  expect(annotated[0].wordPositionOfTheire).toBe(1);
  done();
});
test('correctly annotates sentences with capitalisation', function (done) {
  var testData = [{
    text: 'There she was.'
  }];
  var annotated = (0, _helpers.annotateSentences)(testData);
  expect(annotated.length).toBe(1);
  expect(annotated[0].wordLength).toBe(3);
  expect(annotated[0].charLength).toBe(14);
  expect(annotated[0].endingCharacter).toBe(46);
  expect(annotated[0].label).toEqual(_helpers.THERE_VALUE);
  expect(annotated[0].charPositionOfTheire).toBe(0);
  expect(annotated[0].wordPositionOfTheire).toBe(0);
  done();
});
//# sourceMappingURL=helpers.test.js.map