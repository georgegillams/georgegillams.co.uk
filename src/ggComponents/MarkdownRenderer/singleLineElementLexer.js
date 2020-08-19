/* eslint-disable no-useless-escape */
const MD_IMAGE_REGEX = /!\[(.*?)\]\((.*?)\)(.*)/gims;
const MD_SMART_IMAGE_REGEX = /!\[([0-9]+)x([0-9]+)\]\[(.*?)\]\((.*?)\)\((.*?)\)(.*)/gi;
const MD_YOUTUBE_REGEX = /!yt\[(.*)\]\((.*)\)/gims;

const MD_LINK_REGEX = /\[(.+?)\]\((.+?)\)(.*)/gims;
const MD_BIG_LINK_REGEX = /\*\[(.+?)\]\((.+?)\)/gims;
const MD_STRIKETHROUGH_REGEX = /~(.*?)~(.*)/gims;
const MD_CODE_REGEX = /`(.*?)`(.*)/gims;
const MD_BOLD_REGEX = /\*\*(.*?)\*\*(.*)/gims;
const MD_BOLD_ITALIC_3_STAR_REGEX = /\*\*\*(.*?)\*\*\*(.*)/gims;
const MD_ITALIC_REGEX = /[\_|\*](.*?)[\_\*](.*)/gims;

const MD_CITATION_REGEX = /!cite\(([0-9]+)\)(.*)/gims;
const MD_REFERENCES_REGEX = /!reference\(([0-9]+)\):\ (.*)/gims;
const MD_FOOTNOTE_REFERENCE_REGEX = /\[\^([0-9]+)\](.*)/gims;
const MD_FOOTNOTE_REGEX = /^\[\^([0-9]+)\]:\ (.+)/gims;
/* eslint-enable */

const flatten = arr =>
  arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

// Takes a string, and returns an array
const parseStringForTripleStarBoldItalic = (item, furtherProcess) => {
  if (item.match(MD_BOLD_ITALIC_3_STAR_REGEX)) {
    const elements = item.split(MD_BOLD_ITALIC_3_STAR_REGEX);
    return [
      furtherProcess(elements[0]),
      { type: 'bold', children: [{ type: 'italic', children: [elements[1]] }] },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForBoldness = (item, furtherProcess) => {
  if (item.match(MD_BOLD_REGEX)) {
    const elements = item.split(MD_BOLD_REGEX);
    return [furtherProcess(elements[0]), { type: 'bold', children: [elements[1]] }, furtherProcess(elements[2])];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForBigLink = item => {
  if (item.match(MD_BIG_LINK_REGEX)) {
    const elements = item.split(MD_BIG_LINK_REGEX);
    const href = elements[2];
    const hrefExternal = href.startsWith('http://') || href.startsWith('https://');
    return [
      {
        type: 'bigLink',
        href,
        hrefExternal,
        text: elements[1],
      },
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForLink = (item, furtherProcess) => {
  if (item.match(MD_LINK_REGEX)) {
    const elements = item.split(MD_LINK_REGEX);
    const href = elements[2];
    const hrefExternal = href.startsWith('http://') || href.startsWith('https://');
    return [
      furtherProcess(elements[0]),
      {
        type: 'link',
        href,
        hrefExternal,
        children: [elements[1]],
      },
      furtherProcess(elements[3]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForImage = (item, furtherProcess) => {
  if (item.match(MD_IMAGE_REGEX)) {
    const elements = item.split(MD_IMAGE_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'image',
        caption: elements[1],
        src: elements[2],
      },
      furtherProcess(elements[3]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForYouTube = (item, furtherProcess) => {
  if (item.match(MD_YOUTUBE_REGEX)) {
    const elements = item.split(MD_YOUTUBE_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'youtube',
        showSuggestions: elements[1] === 'true',
        videoID: elements[2],
      },
      furtherProcess(elements[3]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForSmartImage = (item, furtherProcess) => {
  if (item.match(MD_SMART_IMAGE_REGEX)) {
    const elements = item.split(MD_SMART_IMAGE_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'smartImage',
        aspectX: elements[1],
        aspectY: elements[2],
        caption: elements[3],
        lightSrc: elements[4],
        darkSrc: elements[5],
      },
      furtherProcess(elements[6]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForItalic = (item, furtherProcess) => {
  if (item.match(MD_ITALIC_REGEX)) {
    const elements = item.split(MD_ITALIC_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'italic',
        children: [elements[1]],
      },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForCode = (item, furtherProcess) => {
  if (item.match(MD_CODE_REGEX)) {
    const elements = item.split(MD_CODE_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'code',
        text: elements[1],
      },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForStrikethrough = (item, furtherProcess) => {
  if (item.match(MD_STRIKETHROUGH_REGEX)) {
    const elements = item.split(MD_STRIKETHROUGH_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'strikethrough',
        children: [elements[1]],
      },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForFootnoteReference = (item, furtherProcess) => {
  if (item.match(MD_FOOTNOTE_REFERENCE_REGEX)) {
    const elements = item.split(MD_FOOTNOTE_REFERENCE_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'footnoteReference',
        number: elements[1],
      },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForCitations = (item, furtherProcess) => {
  if (item.match(MD_CITATION_REGEX)) {
    const elements = item.split(MD_CITATION_REGEX);
    return [
      furtherProcess(elements[0]),
      {
        type: 'citation',
        identifier: elements[1],
      },
      furtherProcess(elements[2]),
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForReferences = item => {
  if (item.match(MD_REFERENCES_REGEX)) {
    const elements = item.split(MD_REFERENCES_REGEX);
    return [
      {
        type: 'reference',
        identifier: elements[1],
        reference: elements[2],
      },
    ];
  }
  return [item];
};

// Takes a string, and returns an array
const parseStringForFootnote = item => {
  if (item.match(MD_FOOTNOTE_REGEX)) {
    const elements = item.split(MD_FOOTNOTE_REGEX);
    return [
      {
        type: 'footnote',
        number: elements[1],
        children: [elements[2]],
      },
    ];
  }
  return [item];
};

const processStringsInList = (list, func, supportedFeatures) => {
  const result = list.map(item => {
    if (typeof item === 'string') {
      return func(item, toFurtherProcess =>
        // eslint-disable-next-line no-use-before-define
        parseSingleLineElements([toFurtherProcess], supportedFeatures)
      );
    }
    return item;
  });
  return flatten(result);
};

// Run list through parseLinesForCommentBlock (if that feature is supported)
// For each element, if it has children, call self!
const parseSingleLineElements = (list, supportedFeatures) => {
  let result = list;
  if (supportedFeatures.includes('image')) {
    result = processStringsInList(result, parseStringForSmartImage, supportedFeatures);
    result = processStringsInList(result, parseStringForImage, supportedFeatures);
  }
  if (supportedFeatures.includes('video')) {
    result = processStringsInList(result, parseStringForYouTube, supportedFeatures);
  }
  if (supportedFeatures.includes('bold') && supportedFeatures.includes('italic')) {
    result = processStringsInList(result, parseStringForTripleStarBoldItalic, supportedFeatures);
  }
  if (supportedFeatures.includes('bold')) {
    result = processStringsInList(result, parseStringForBoldness, supportedFeatures);
  }
  if (supportedFeatures.includes('italic')) {
    result = processStringsInList(result, parseStringForItalic, supportedFeatures);
  }
  if (supportedFeatures.includes('bigLink')) {
    result = processStringsInList(result, parseStringForBigLink, supportedFeatures);
  }
  if (supportedFeatures.includes('link')) {
    result = processStringsInList(result, parseStringForLink, supportedFeatures);
  }
  if (supportedFeatures.includes('code')) {
    result = processStringsInList(result, parseStringForCode, supportedFeatures);
  }
  if (supportedFeatures.includes('strikethrough')) {
    result = processStringsInList(result, parseStringForStrikethrough, supportedFeatures);
  }
  if (supportedFeatures.includes('citation')) {
    result = processStringsInList(result, parseStringForCitations, supportedFeatures);
    result = processStringsInList(result, parseStringForReferences, supportedFeatures);
  }
  if (supportedFeatures.includes('footnote')) {
    result = processStringsInList(result, parseStringForFootnote, supportedFeatures);
    result = processStringsInList(result, parseStringForFootnoteReference, supportedFeatures);
  }

  // handle children elements recursively:
  result = result.map(l => {
    if (l.children) {
      return {
        ...l,
        children: parseSingleLineElements(l.children, supportedFeatures),
      };
    }
    return l;
  });

  return result;
};

export default parseSingleLineElements;
export {
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
  parseStringForSmartImage,
  parseStringForStrikethrough,
  parseStringForTripleStarBoldItalic,
  parseStringForYouTube,
};
