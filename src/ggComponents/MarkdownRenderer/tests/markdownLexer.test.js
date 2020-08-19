#!/usr/bin/env node

import { markdownLexer } from '../markdownLexer.js';

test('parses link', () => {
  const result = markdownLexer('This is a test which contains a [link](https://www.google.com/) to Google.');
  expect(result.error).toBe(undefined);
  expect(JSON.stringify(result)).toMatchSnapshot();
});

test('parses big link', () => {
  const result = markdownLexer('*[Big link](https://www.google.com/)');
  expect(result.error).toBe(undefined);
  expect(JSON.stringify(result)).toMatchSnapshot();
});

test('parses whitespace', () => {
  const result = markdownLexer('   \n  \n   \n ');
  expect(result.error).toBe(undefined);
  expect(JSON.stringify(result)).toMatchSnapshot();
});

test('parses inline code', () => {
  const result = markdownLexer('This is a test which contains some `inline code`.');
  expect(result.error).toBe(undefined);
  expect(JSON.stringify(result)).toMatchSnapshot();
});

test('parses bold', () => {
  const result = markdownLexer('This is a test which contains a **boldified** chunk of text.');
  expect(result.error).toBe(undefined);
  expect(JSON.stringify(result)).toMatchSnapshot();
});

// test('parses sectioned structure', done => {
//   const result = markdownLexer(
//     `Text outside any section

// # My section

// Text in section`,
//   );
//   expect(result.error).toBe(undefined);
//   expect(JSON.stringify(result)).toEqual(
//     `["Text outside any section",{"type":"section","title":"My section","child":"Text in section"},null]`,
//   );
//   done();
// });

// test('parses sectioned structure 2', done => {
//   const result = markdownLexer(
//     `Text outside any section

// # My section

// Text in section

// ## My sub section

// Text inside my subsection`,
//   );
//   expect(result.error).toBe(undefined);
//   expect(JSON.stringify(result)).toEqual(
//     `["Text outside any section",{"type":"section","title":"My section","child":["Text in section",{"type":"subsection","title":"My sub section","child":"Text inside my subsection"},null]},null]`,
//   );
//   done();
// });

// test('parses sectioned structure 3', done => {
//   const result = markdownLexer(
//     `Text outside any section

// # My section

// Text in section

// ### My sub sub section

// Text inside my subsubsection.`,
//   );
//   expect(result.error).toBe(undefined);
//   expect(JSON.stringify(result)).toEqual(
//     `["Text outside any section",{"type":"section","title":"My section","child":["Text in section",{"type":"subsubsection","title":"My sub sub section","child":"Text inside my subsubsection."},null]},null]`,
//   );
//   done();
// });

// test('well extreme', done => {
//   const result = markdownLexer(`

// # h1 Heading 8-)

// paragraph 1

// ## h2 Heading

// paragraph 2

// ### h3 Heading

// paragraph 3

// **This is bold text**

// __This is italic text__

// ~Strikethrough~

// ## Quote

// > This is a quote

// ## Blockquotes

// > Blockquotes are currently unsupported

// ## Lists

// Lists are currently unsupported

// ## Code

// Inline \`code\`

// Block code fences

// \`\`\`
// Sample text here...
// \`\`\`

// `);
//   expect(result.error).toBe(undefined);
//   expect(JSON.stringify(result)).toEqual(
//     '["",{"type":"section","title":"h1 Heading 8-)","child":[[[[["paragraph 1",{"type":"subsection","title":"h2 Heading","child":["paragraph 2",{"type":"subsubsection","title":"h3 Heading","child":[["paragraph 3",{"type":"paragraph","child":["",{"type":"bold","child":"This is bold text"},""]},[["",{"type":"italic","child":""},"This is italic text"],{"type":"italic","child":""},""]],{"type":"paragraph","child":["",{"type":"strikethrough","child":"Strikethrough"},""]},""]},null]},null],{"type":"subsection","title":"Quote","child":["",{"type":"paragraph","child":"> This is a quote"},""]},null],{"type":"subsection","title":"Blockquotes","child":["",{"type":"quotation","child":" Blockquotes are currently unsupported"},""]},null],{"type":"subsection","title":"Lists","child":"Lists are currently unsupported"},null],{"type":"subsection","title":"Code","child":[["Inline ",{"type":"code","text":"code"},""],{"type":"paragraph","child":"Block code fences"},["",{"type":"codeblock","language":"","githubUrl":"","text":"Sample text here..."},""]]},null]},null]',
//   );
//   done();
// });

// // test('parses sectioned structure', done => {
// //  const result = markdownLexer(
// //    `Text outside any section
// // # Section
// // Text in section
// // # Subsection
// // Text in sub-section
// // ## SubSubSection
// // Text in sub-sub-section`,
// //  );
// //  expect(result.error).toBe(undefined);
// //  expect(result).toEqual([
// //    `Text outside any section`,
// //    {
// //      title: 'Section',
// //      type: 'section',
// //      child: [
// //        `Text in section`,
// //        {
// //          title: 'Subsection',
// //          type: 'subsection',
// //          child: [
// //            `Text in sub-section`,
// //            {
// //              title: 'SubSubSection',
// //              type: 'subsubsection',
// //              child: `Text in sub-sub-section`,
// //            },
// //            null,
// //          ],
// //        },
// //        null,
// //      ],
// //    },
// //    null,
// //  ]);
// //  done();
// // });
