/* eslint-disable prefer-destructuring */

/* eslint-disable no-useless-escape */
const MD_QUOTATION_REGEX = /\>\ (.*)/gims;
const MD_BULLET_REGEX = /^\s+\-\ (.*)/gims;
const MD_NUMBERED_REGEX = /^\s+[0-9]+\.\ (.*)/gims;
const MD_CODE_BLOCK_START_REGEX = /```\ ?(.*)/gims;
const MD_CODE_BLOCK_START_LANG_URL_REGEX = /```\ (.+)\,\ (.+)/gims;
const MD_CODE_BLOCK_END_REGEX = /```/gims;
/* eslint-enable no-useless-escape */

const convertLinesToParagraphs = list =>
  list.map(l => {
    if (l.type === 'line') {
      return { type: 'paragraph', children: [l.content] };
    }
    return l;
  });

const parseLinesForNumberedList = list => {
  const results = [];
  let currentResult = null;

  list.forEach(l => {
    if (l.type !== 'line') {
      results.push(l);
      return;
    }

    if (l.content.match(MD_NUMBERED_REGEX)) {
      if (!currentResult) {
        currentResult = { type: 'numberedList', children: [] };
      }
      const splitUpLine = l.content.split(MD_NUMBERED_REGEX);
      currentResult.children.push({
        type: 'paragraph',
        children: [splitUpLine[1]],
      });
    } else {
      if (currentResult) {
        results.push(currentResult);
        currentResult = null;
      }
      results.push(l);
    }
  });

  // push the current result if there is still one being constructed and we've reached the end of the list
  if (currentResult) {
    results.push(currentResult);
  }

  return results;
};

const parseLinesForBulletList = list => {
  const results = [];
  let currentResult = null;

  list.forEach(l => {
    if (l.type !== 'line') {
      results.push(l);
      return;
    }

    if (l.content.match(MD_BULLET_REGEX)) {
      if (!currentResult) {
        currentResult = { type: 'bulletList', children: [] };
      }
      const splitUpLine = l.content.split(MD_BULLET_REGEX);
      currentResult.children.push({
        type: 'paragraph',
        children: [splitUpLine[1]],
      });
    } else {
      if (currentResult) {
        results.push(currentResult);
        currentResult = null;
      }
      results.push(l);
    }
  });

  // push the current result if there is still one being constructed and we've reached the end of the list
  if (currentResult) {
    results.push(currentResult);
  }

  return results;
};

const parseLinesForBlockCode = list => {
  const results = [];
  let currentResult = null;

  list.forEach(l => {
    if (l.type !== 'line') {
      results.push(l);
      return;
    }

    if (!currentResult) {
      if (l.content.match(MD_CODE_BLOCK_START_LANG_URL_REGEX)) {
        currentResult = { type: 'blockCode', codeLines: [] };
        const splitUpLine = l.content.split(MD_CODE_BLOCK_START_LANG_URL_REGEX);
        currentResult.language = splitUpLine[1];
        currentResult.url = splitUpLine[2];
        return;
      }
      if (l.content.match(MD_CODE_BLOCK_START_REGEX)) {
        currentResult = { type: 'blockCode', codeLines: [] };
        const splitUpLine = l.content.split(MD_CODE_BLOCK_START_REGEX);
        currentResult.language = splitUpLine[1];
        return;
      }
    } else if (currentResult && l.content.match(MD_CODE_BLOCK_END_REGEX)) {
      results.push(currentResult);
      currentResult = null;
      return;
    } else if (currentResult) {
      currentResult.codeLines.push(l.content);
      return;
    }
    results.push(l);
  });

  // push the current result if there is still one being constructed and we've reached the end of the list
  if (currentResult) {
    results.push(currentResult);
  }

  return results;
};

const parseLinesForQuoteBlock = list => {
  const results = [];
  let currentResult = null;

  list.forEach(l => {
    if (l.type !== 'line') {
      results.push(l);
      return;
    }

    if (l.content.match(MD_QUOTATION_REGEX)) {
      if (!currentResult) {
        currentResult = { type: 'quotation', children: [] };
      }
      const splitUpLine = l.content.split(MD_QUOTATION_REGEX);
      currentResult.children.push({
        type: 'paragraph',
        children: [splitUpLine[1]],
      });
    } else {
      if (currentResult) {
        results.push(currentResult);
        currentResult = null;
      }
      results.push(l);
    }
  });

  // push the current result if there is still one being constructed and we've reached the end of the list
  if (currentResult) {
    results.push(currentResult);
  }

  return results;
};

// Run list through parseLinesForCommentBlock (if that feature is supported)
// For each element, if it has children, call self!
const parseMultiLineElements = (list, supportedFeatures) => {
  let result = list;

  if (supportedFeatures.includes('quotation')) {
    result = parseLinesForQuoteBlock(result);
  }

  if (supportedFeatures.includes('bulletList')) {
    result = parseLinesForBulletList(result);
  }

  if (supportedFeatures.includes('numberedList')) {
    result = parseLinesForNumberedList(result);
  }

  if (supportedFeatures.includes('blockCode')) {
    result = parseLinesForBlockCode(result);
  }

  // handle children elements recursively:
  result = result.map(l => {
    if (l.children) {
      return {
        ...l,
        children: parseMultiLineElements(l.children, supportedFeatures),
      };
    }
    return l;
  });

  result = convertLinesToParagraphs(result);

  return result;
};

export default parseMultiLineElements;
export { parseMultiLineElements, parseLinesForQuoteBlock, parseLinesForBulletList, parseLinesForBlockCode };
