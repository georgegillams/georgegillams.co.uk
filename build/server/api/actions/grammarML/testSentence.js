"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = test;

var _jsRegression = _interopRequireDefault(require("js-regression"));

var _winkPerceptron = _interopRequireDefault(require("wink-perceptron"));

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _helpers = require("./helpers");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function test(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _grammarMLAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      var text = reqSecured.body.text;
      (0, _datum.datumLoad)({
        redisKey: 'grammarML'
      }).then(function (trainingData) {
        var testData = [reqSecured.body];
        var annotatedData = (0, _helpers.annotateSentences)(trainingData);
        var annotatedTestData = (0, _helpers.annotateSentences)(testData);
        var dataMatrix = (0, _helpers.extractDataMatrix)(annotatedData);
        var testDataMatrix = (0, _helpers.extractDataMatrix)(annotatedTestData); // const normaliser = getDataNormaliser(dataMatrix);
        // dataMatrix = dataMatrix.map(normaliser);
        // testDataMatrix = dataMatrix.map(normaliser);

        testDataMatrix = testDataMatrix[0][0]; // console.log(`dataMatrix`, dataMatrix);
        // console.log(`testDataMatrix`, testDataMatrix);

        var classifier = (0, _helpers.trainModel)(dataMatrix);
        var result = (0, _helpers.useClassifier)(classifier, testDataMatrix);
        var correctResult = "Sentence does not contain 'there' or 'their'";

        if (text.toLowerCase().includes('there') || text.toLowerCase().includes('their')) {
          correctResult = 'Sentence is correct';
        }

        if (result === _helpers.THERE_VALUE && text.toLowerCase().includes('their')) {
          correctResult = 'Sentence is incorrect. Should read: ';
          correctResult += text.toLowerCase().split("their").join('there');
        }

        if (result === _helpers.THEIR_VALUE && text.toLowerCase().includes('there')) {
          correctResult = 'Sentence is incorrect. Should read: ';
          correctResult += text.toLowerCase().split("there").join('their');
        } // console.log(`correctResult`, correctResult);


        resolve({
          result: correctResult
        });
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=testSentence.js.map