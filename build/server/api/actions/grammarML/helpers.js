"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitData = exports.THEIR_VALUE = exports.THERE_VALUE = exports.annotateSentences = exports.extractDataMatrix = exports.trainModel = exports.useClassifier = void 0;

var _jsRegression = _interopRequireDefault(require("js-regression"));

var _winkPerceptron = _interopRequireDefault(require("wink-perceptron"));

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var THEIR_VALUE = 'THEIR';
exports.THEIR_VALUE = THEIR_VALUE;
var THERE_VALUE = 'THERE';
exports.THERE_VALUE = THERE_VALUE;

var getLastTwoCharValues = function getLastTwoCharValues(word) {
  var result = 0;
  var wordLength = word.length;
  result += word.charCodeAt(wordLength - 1);
  result += word.charCodeAt(wordLength - 2);
  return result;
};

var annotateSentences = function annotateSentences(data) {
  return data.map(function (d) {
    var res = JSON.parse(JSON.stringify(d));

    if (!d || !d.text || d.text.length < 5) {
      return null;
    }

    var lowerCaseText = d.text.toLowerCase();
    res.wordLength = d.text.split(' ').length;
    res.charLength = d.text.length;
    res.endingCharacter = d.text.charCodeAt(res.charLength - 1);
    res.label = '';
    res.label += lowerCaseText.includes("their") ? THEIR_VALUE : '';
    res.label += lowerCaseText.includes("there") ? THERE_VALUE : '';
    var postTheireText = lowerCaseText;

    if (postTheireText.includes('there')) {
      postTheireText = postTheireText.split("there")[1];
    }

    if (postTheireText.includes('their')) {
      postTheireText = postTheireText.split('their')[1];
    }

    var preTheireText = lowerCaseText.split("there")[0].split('their')[0];
    res.charPositionOfTheire = preTheireText.length;
    res.wordPositionOfTheire = preTheireText.split(' ').length - 1;
    res.wordBeforeEnding = 0;
    res.wordAfterEnding = 0;
    var wordsBefore = preTheireText.split(' ');
    var wordBeforeIndex = wordsBefore.length - 2;

    if (wordBeforeIndex >= 0) {
      var wordBefore = wordsBefore[wordBeforeIndex];
      res.wordBeforeEnding = getLastTwoCharValues(wordBefore);
    }

    if (postTheireText) {
      var wordsAfter = postTheireText.split(' ');
      var wordAfterIndex = 1;

      if (wordAfterIndex > wordsAfter.length) {
        var wordAfter = wordsAfter[wordAfterIndex];
        res.wordAfterEnding = getLastTwoCharValues(wordAfter);
      }
    }

    return res;
  });
};

exports.annotateSentences = annotateSentences;

var extractDataMatrix = function extractDataMatrix(data) {
  var _final = data.map(function (d) {
    if (!d) {
      return null;
    }

    var resX = JSON.parse(JSON.stringify(d));
    delete resX.text;
    delete resX.label;
    delete resX.id;
    delete resX.timestamp;
    delete resX.lastUpdatedTimestamp;
    delete resX.authorId;
    var resY = {
      label: d.label
    };
    return [resX, resY];
  });

  return _final;
}; // const scanData = dataMatrix => {
//   const mins = {};
//   const maxs = {};
//   const averages = {};
//
//   dataMatrix.forEach(data => {
//     const dataX = data[0];
//     Object.keys(dataX).forEach(k => {
//       if (!mins[k]) {
//         mins[k] = 100000000;
//       }
//       if (!maxs[k]) {
//         maxs[k] = -100000000;
//       }
//       if (!averages[k]) {
//         averages[k] = 0;
//       }
//       console.log(`k`, k);
//       mins[k] = Math.min(dataX[k], mins[k]);
//       maxs[k] = Math.max(dataX[k], maxs[k]);
//       averages[k] += dataX[k] / dataMatrix.length;
//     });
//   });
//
//   return { mins, maxs, averages };
// };
//
// const getDataNormaliser = dataMatrix => {
//   const { mins, maxs, averages } = scanData(dataMatrix);
//   console.log(`mins`, mins);
//   console.log(`maxs`, maxs);
//   console.log(`averages`, averages);
//   // TODO - IMPLEMENT
//
//   return d => {
//     return d;
//   };
// };


exports.extractDataMatrix = extractDataMatrix;

var trainModel = function trainModel(data) {
  var perceptron = (0, _winkPerceptron["default"])();
  perceptron.defineConfig({
    shuffleData: true,
    maxIterations: 21
  });
  perceptron.learn(data);
  return perceptron;
};

exports.trainModel = trainModel;

var useClassifier = function useClassifier(classifier, testData) {
  var prediction = classifier.predict(testData);
  return prediction;
};

exports.useClassifier = useClassifier;

var splitData = function splitData(arr, ratio) {
  var trainingData = [];
  var testData = [];
  arr.forEach(function (a) {
    var randomNumber = Math.random();

    if (randomNumber < ratio) {
      trainingData.push(a);
    } else {
      testData.push(a);
    }
  });
  return {
    trainingData: trainingData,
    testData: testData
  };
};

exports.splitData = splitData;
//# sourceMappingURL=helpers.js.map