#!/usr/bin/env node

import {
  parseMultiLineElements,
  parseLinesForQuoteBlock,
  parseLinesForBulletList,
  parseLinesForBlockCode,
} from '../multiLineElementLexer.js';
import { DEFAULT_SUPPORTED_FEATURES } from '../constants.js';

// #region individual lists
test('parses lines to insert code-block', () => {
  const result = parseLinesForBlockCode([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: '```' },
    { type: 'line', content: ' - Some code' },
    {
      type: 'line',
      content: ' - Some code with a [link](https://duckduckgo.com)',
    },
    { type: 'line', content: '```' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert code-block with language', () => {
  const result = parseLinesForBlockCode([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: '``` js' },
    { type: 'line', content: ' - Some code' },
    {
      type: 'line',
      content: ' - Some code with a [link](https://duckduckgo.com)',
    },
    { type: 'line', content: '```' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert code-block', () => {
  const result = parseLinesForBlockCode([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: '``` js, https://github.com/' },
    { type: 'line', content: ' - Some code' },
    {
      type: 'line',
      content: ' - Some code with a [link](https://duckduckgo.com)',
    },
    { type: 'line', content: '```' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert bullet-list', () => {
  const result = parseLinesForBulletList([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: ' - Bullet 1' },
    { type: 'line', content: ' - Bullet 2' },
    { type: 'line', content: ' - Bullet 3' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert numbered-list', () => {
  const result = parseLinesForQuoteBlock([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: ' 1. Numbered item 1' },
    { type: 'line', content: ' 2. Numbered item 2' },
    { type: 'line', content: ' 3. Numbered item 3' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines containing no comment block', () => {
  const result = parseLinesForQuoteBlock([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
    { type: 'line', content: 'Line 4' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert comment block at start', () => {
  const result = parseLinesForQuoteBlock([
    { type: 'line', content: '> Quote line 1' },
    { type: 'line', content: '> Quote line 2' },
    { type: 'line', content: '> Quote line 3' },
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses lines to insert comment block in middle', () => {
  const result = parseLinesForQuoteBlock([
    { type: 'line', content: 'Line 1' },
    { type: 'line', content: 'Line 2' },
    { type: 'line', content: '> Quote line 1' },
    { type: 'line', content: '> Quote line 2' },
    { type: 'line', content: '> Quote line 3' },
    { type: 'line', content: 'Line 3' },
  ]);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
// #endregion individual lists

// #region structure
test('parses comment block inside section', () => {
  const result = parseMultiLineElements(
    [
      { type: 'line', content: 'Line 1' },
      {
        type: 'section',
        children: [
          { type: 'line', content: 'Line 2' },
          { type: 'line', content: '> Quote line 1' },
          { type: 'line', content: '> Quote line 2' },
          { type: 'line', content: '> Quote line 3' },
          { type: 'line', content: 'Line 3' },
        ],
      },
      { type: 'line', content: 'Line 4' },
    ],
    DEFAULT_SUPPORTED_FEATURES
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('ignores comment block if feature is unsupported', () => {
  const result = parseMultiLineElements(
    [
      { type: 'line', content: 'Line 1' },
      { type: 'line', content: 'Line 2' },
      { type: 'line', content: '> Unsupported quote line 1' },
      { type: 'line', content: '> Unsupported quote line 2' },
      { type: 'line', content: '> Unsupported quote line 3' },
      { type: 'line', content: 'Line 3' },
    ],
    []
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
// #endregion structure
