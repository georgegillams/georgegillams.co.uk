/* eslint-disable no-useless-escape */
const MD_SECTION_REGEX = /^#\ (.+)/gims;
const MD_SUBSECTION_REGEX = /^##\ (.+)/gims;
const MD_SUBSUBSECTION_REGEX = /^###\ (.+)/gims;
/* eslint-enable */

const matchesSectioningRegex = text => {
  let matches = false;
  if (text.match(MD_SECTION_REGEX)) {
    matches = true;
  }
  if (text.match(MD_SUBSECTION_REGEX)) {
    matches = true;
  }
  if (text.match(MD_SUBSUBSECTION_REGEX)) {
    matches = true;
  }
  return matches;
};

const isSectioned = splitContent => {
  let contentIsSectioned = false;
  splitContent.forEach(c => {
    if (matchesSectioningRegex(c)) {
      contentIsSectioned = true;
    }
  });
  return contentIsSectioned;
};

const convertStringsToLines = strings => strings.map(sC => ({ type: 'line', content: sC }));

// TODO Should ignore lines matching the regex if inside a code block
/*
 * Turns a flat list of strings into a list of sections (and paragraphs), extracting the name and children for each one.
 */
const parseSectioning = (splitContent, type, regex, listIfUnsectioned = true) => {
  if (splitContent.length === 0) {
    return { type, name: null, children: [] };
  }

  const results = [];

  let currentResult = null;
  if (!listIfUnsectioned) {
    currentResult = { type, name: null, children: [] };
  }

  splitContent.forEach(sC => {
    if (sC.match(regex)) {
      results.push(currentResult);
      const title = sC.split(regex)[1];
      currentResult = { type, name: title, children: [] };
    } else if (currentResult) {
      currentResult.children.push(sC);
    } else {
      results.push({ type: 'line', content: sC });
    }
  });

  results.push(currentResult);
  const nonEmptyResults = results.filter(x => x && (x.type !== type || !!x.name || x.children.length > 0));

  return nonEmptyResults;
};

const parseSubsubsections = splitContent => {
  const result = parseSectioning(splitContent, 'subsubsection', MD_SUBSUBSECTION_REGEX);
  return result;
};

const parseSubsections = splitContent => {
  let result = parseSectioning(splitContent, 'subsection', MD_SUBSECTION_REGEX);
  result = result.map(r => {
    if (r.type === 'subsection') {
      return {
        ...r,
        children: parseSubsubsections(r.children),
      };
    }
    return r;
  });
  return result;
};

const parseSections = splitContent => {
  let result = parseSectioning(splitContent, 'section', MD_SECTION_REGEX, false);
  result = result.map(r => {
    if (r.type === 'section') {
      return { ...r, children: parseSubsections(r.children) };
    }
    return r;
  });
  return result;
};

/*
 * Turns a string into a list of sections and lines, ready for further processing
 */
const lexStructure = (content, supportedFeatures) => {
  const splitContent = content.split('\n').filter(x => x.trim() !== '');
  if (splitContent.length === 0) {
    return [];
  }
  if (!supportedFeatures.includes('sectioning') || !isSectioned(splitContent)) {
    return convertStringsToLines(splitContent);
  }
  const parsedSections = parseSections(splitContent);
  return parsedSections;
};

export default lexStructure;
export { lexStructure };
