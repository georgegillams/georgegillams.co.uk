import { datumUpdate, datumLoad } from '../datum';
import jsregression from 'js-regression';
import winkPerceptron from 'wink-perceptron';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

const THEIR_VALUE = 'THEIR';
const THERE_VALUE = 'THERE';

const annotateSentences = data => {
  return data.map(d => {
    const res = JSON.parse(JSON.stringify(d));
    if (!d || !d.text || d.text.length < 5) {
      return null;
    }
    const lowerCaseText = d.text.toLowerCase();
    res.wordLength = d.text.split(' ').length;
    res.charLength = d.text.length;
    res.endingCharacter = d.text.charCodeAt(res.charLength - 1);
    res.label = '';
    res.label += lowerCaseText.includes(`their`) ? THEIR_VALUE : '';
    res.label += lowerCaseText.includes(`there`) ? THERE_VALUE : '';

    const preTheireText = lowerCaseText.split(`there`)[0].split('their')[0];
    res.charPositionOfTheire = preTheireText.length;
    res.wordPositionOfTheire = preTheireText.split(' ').length;

    return res;
  });
};

const extractDataMatrix = data => {
  const final = data.map(d => {
    if (!d) {
      return null;
    }
    const resX = JSON.parse(JSON.stringify(d));
    delete resX.text;
    delete resX.label;
    delete resX.id;
    delete resX.timestamp;
    delete resX.lastUpdatedTimestamp;
    delete resX.authorId;
    const resY = { label: d.label };
    return [resX, resY];
  });
  return final;
};

// const scanData = dataMatrix => {
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

const trainModel = data => {
  const perceptron = winkPerceptron();
  perceptron.defineConfig({ shuffleData: true, maxIterations: 21 });
  perceptron.learn(data);
  return perceptron;
};

const useClassifier = (classifier, testData) => {
  const prediction = classifier.predict(testData);
  return prediction;
};

export default function test(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        const { text } = reqSecured.body;
        datumLoad({
          redisKey: 'grammarML',
        }).then(trainingData => {
          const testData = [reqSecured.body];
          const annotatedData = annotateSentences(trainingData);
          const annotatedTestData = annotateSentences(testData);
          let dataMatrix = extractDataMatrix(annotatedData);
          let testDataMatrix = extractDataMatrix(annotatedTestData);
          // const normaliser = getDataNormaliser(dataMatrix);
          // dataMatrix = dataMatrix.map(normaliser);
          // testDataMatrix = dataMatrix.map(normaliser);
          testDataMatrix = testDataMatrix[0][0];

          // console.log(`dataMatrix`, dataMatrix);
          // console.log(`testDataMatrix`, testDataMatrix);
          const classifier = trainModel(dataMatrix);
          const result = useClassifier(classifier, testDataMatrix);
          let correctResult = "Sentence does not contain 'there' or 'their'";
          if (
            text.toLowerCase().includes('there') ||
            text.toLowerCase().includes('their')
          ) {
            correctResult = 'Sentence is correct';
          }
          if (result === THERE_VALUE && text.toLowerCase().includes('their')) {
            correctResult = 'Sentence is incorrect. Should read: ';
            correctResult += text
              .toLowerCase()
              .split(`their`)
              .join('there');
          }
          if (result === THEIR_VALUE && text.toLowerCase().includes('there')) {
            correctResult = 'Sentence is incorrect. Should read: ';
            correctResult += text
              .toLowerCase()
              .split(`there`)
              .join('their');
          }
          // console.log(`correctResult`, correctResult);
          resolve({ result: correctResult });
        });
      },
      err => reject(err),
    );
  });
}
