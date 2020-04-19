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
      var ratio = reqSecured.body.ratio;
      (0, _datum.datumLoad)({
        redisKey: 'grammarML'
      }).then(function (allData) {
        var _splitData = (0, _helpers.splitData)(allData, parseFloat(ratio)),
            trainingData = _splitData.trainingData,
            testData = _splitData.testData;

        var annotatedData = (0, _helpers.annotateSentences)(trainingData);
        var annotatedTestData = (0, _helpers.annotateSentences)(testData);
        var dataMatrix = (0, _helpers.extractDataMatrix)(annotatedData);
        var testDataMatrix = (0, _helpers.extractDataMatrix)(annotatedTestData); // const normaliser = getDataNormaliser(dataMatrix);
        // dataMatrix = dataMatrix.map(normaliser);
        // testDataMatrix = dataMatrix.map(normaliser);
        // console.log(`dataMatrix`, dataMatrix);
        // console.log(`testDataMatrix`, testDataMatrix);

        var predictionsMade = 0;
        var correctPredictions = 0;
        var classifier = (0, _helpers.trainModel)(dataMatrix);
        testDataMatrix.forEach(function (td) {
          var testItem = td[0]; // console.log(`testItem`, testItem);

          var result = (0, _helpers.useClassifier)(classifier, testItem); // console.log(`label`, td[1].label);

          predictionsMade += 1;

          if (result === td[1].label) {
            correctPredictions += 1;
          }
        }); // console.log(`correctResult`, correctResult);

        resolve({
          result: correctPredictions / predictionsMade
        });
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=testPerformance.js.map