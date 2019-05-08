import { datumUpdate, datumLoad } from '../datum';
import jsregression from 'js-regression';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

const THEIR_VALUE = 100;
const THERE_VALUE = 200;

const annotateSentences = data => {
  return data.map(d => {
    const res = JSON.parse(JSON.stringify(d));
    if (!d || !d.text || d.text.length < 5) {
      return null;
    }
    res.wordLength = d.text.split(' ').length;
    res.charLength = d.text.length;
    res.endingCharacter = d.text.charCodeAt(res.charLength - 1);
    res.theireType = 0;
    res.theireType += d.text.toLowerCase().includes(`their`) ? THEIR_VALUE : 0;
    res.theireType += d.text.toLowerCase().includes(`there`) ? THERE_VALUE : 0;
    return res;
  });
};

const extractDataMatrix = data => {
  const result = [];
  data.forEach(d => {
    if (d) {
      const row = [];
      row.push(d.wordLength);
      row.push(d.charLength);
      row.push(d.endingCharacter);
      row.push(d.theireType);
      result.push(row);
    }
  });
  return result;
};

const trainModel = data => {
  var classifier = new jsregression.MultiClassLogistic({
    alpha: 0.001,
    iterations: 1000,
    lambda: 0.0,
  });
  const predictor = classifier.fit(data);
  // console.log(`predictor`, predictor);
  return classifier;
};

const useClassifier = (classifier, testData) => {
  const prediction = classifier.transform(testData);
  // console.log(`prediction`, prediction);
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
          const dataMatrix = extractDataMatrix(annotatedData);
          const testDataMatrix = extractDataMatrix(annotatedTestData);
          // console.log(`dataMatrix`, dataMatrix);
          // console.log(`testDataMatrix`, testDataMatrix);
          const classifier = trainModel(dataMatrix);
          const result = useClassifier(classifier, testDataMatrix[0]);
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
          resolve({ result: correctResult });
        });
      },
      err => reject(err),
    );
  });
}
