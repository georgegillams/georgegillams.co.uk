/* eslint-disable max-len */

import { lexStructure } from '../markdownSectionLexer.js';
import { DEFAULT_SUPPORTED_FEATURES } from '../constants';

test('parses whitespace', () => {
  const result = lexStructure('  \n \n   ', DEFAULT_SUPPORTED_FEATURES);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses single paragraph', () => {
  const result = lexStructure('1 paragraph.', DEFAULT_SUPPORTED_FEATURES);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses multiple paragraphs', () => {
  const result = lexStructure('1 paragraph.\n2 paragraph.\n3 paragraph.', DEFAULT_SUPPORTED_FEATURES);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test("doesn't parses section if unsupported", () => {
  const result = lexStructure('# 1 Unsupported section\n1 paragraph.', []);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses section at start', () => {
  const result = lexStructure('# 1 Section\n1 paragraph.', DEFAULT_SUPPORTED_FEATURES);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses section in middle', () => {
  const result = lexStructure('1 paragraph.\n# 1 Section\n2 paragraph.', DEFAULT_SUPPORTED_FEATURES);
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});

test('parses nested sectioning', () => {
  const result = lexStructure(
    '1 paragraph.\n# 1 Section\n2 paragraph.\n## 1 Sub-section\n3 paragraph.\n# 2 Sub-section\n4 paragraph.\n# 2 Section\n5 paragraph.',
    DEFAULT_SUPPORTED_FEATURES
  );
  expect(result.error).toBe(undefined);
  expect(result).toMatchSnapshot();
});
