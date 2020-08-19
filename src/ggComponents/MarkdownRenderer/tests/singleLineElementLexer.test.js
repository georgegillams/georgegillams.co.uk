/* eslint-disable max-len */

import {
  parseSingleLineElements,
  parseStringForBoldness,
  parseStringForCitations,
  parseStringForCode,
  parseStringForFootnote,
  parseStringForFootnoteReference,
  parseStringForImage,
  parseStringForItalic,
  parseStringForLink,
  parseStringForBigLink,
  parseStringForReferences,
  parseStringForYouTube,
  parseStringForSmartImage,
  parseStringForStrikethrough,
  parseStringForTripleStarBoldItalic,
} from '../singleLineElementLexer.js';
import { DEFAULT_SUPPORTED_FEATURES } from '../constants.js';

const simpleFurtherProcess = x => `forFurtherProcessing: "${x}"`;

// #region individual items
test('parses text containing image', () => {
  const result = parseStringForImage('Line containing ![imageCaption](imageSrc) text', simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing big link', () => {
  const result = parseStringForBigLink(`*[Big link to DDG](https://duckduckgo.com/)`, simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing link', () => {
  const result = parseStringForLink(
    `This contains a [link to DDG](https://duckduckgo.com/) text.`,
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing strikethrough', () => {
  const result = parseStringForStrikethrough(`This contains some ~stricken~ text.`, simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing footnote', () => {
  const result = parseStringForFootnote(
    `This footnote[^1] points to something under the paragraph.\nThis is the end of the paragraph\n[^1]: This is **the** footnote`,
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing footnote reference', () => {
  const result = parseStringForFootnoteReference(
    `This footnote[^1] points to something under the paragraph.\nThis is the end of the paragraph\n[^1]: This is **the** footnote`,
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing citation', () => {
  const result = parseStringForCitations(
    `This points to some citation!cite(7) that will appear further down!cite(10) the page.`,
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing reference', () => {
  const result = parseStringForReferences(
    `!reference(4): This is the forth reference\n!reference(5): This is the fifth reference`,
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing smart image', () => {
  const result = parseStringForSmartImage(
    'Line containing ![1x2][imageCaption](lightImageSrc)(darkImageSrc) followed by some **emphasized** text',
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing video', () => {
  const result = parseStringForYouTube(
    'Line containing !yt[true](jofNR_WkoCE) followed by some **emphasized** text',
    simpleFurtherProcess
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing italic', () => {
  const result = parseStringForItalic(`Line containing _wonky_ text\nAnd this is *some more*.`, simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing code', () => {
  const result = parseStringForCode('Line containing `some inline code` just like that', simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing bold', () => {
  const result = parseStringForBoldness('Line containing **emphasized** text', simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing 3-star bold italic', () => {
  const result = parseStringForTripleStarBoldItalic('Line containing ***emphasized*** text', simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
test('parses text containing bold italic', () => {
  const result = parseStringForBoldness('Line containing **_emphasized_** text', simpleFurtherProcess);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
// #endregion

// #region structure
test('parses paragraphs containing styled text', () => {
  const result = parseSingleLineElements(
    [
      { type: 'paragraph', children: ['Line containing **emphasized** text'] },
      { type: 'paragraph', children: ['Line containing _wonky_ text'] },
      {
        type: 'paragraph',
        children: ['Line containing [link to DDG](https://duckduckgo.com/)'],
      },
    ],
    DEFAULT_SUPPORTED_FEATURES
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
// #endregion
