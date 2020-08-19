import { lexStructure } from './markdownSectionLexer';
import { DEFAULT_SUPPORTED_FEATURES } from './constants';
import { parseMultiLineElements } from './multiLineElementLexer';
import { parseSingleLineElements } from './singleLineElementLexer';

const markdownLexer = (content, supportedFeatures = DEFAULT_SUPPORTED_FEATURES) => {
  const lexedStructure = lexStructure(content, supportedFeatures);
  const lexedStructureWithMultiLineElements = parseMultiLineElements(lexedStructure, supportedFeatures);
  const lexedStructureWithAllElements = parseSingleLineElements(lexedStructureWithMultiLineElements, supportedFeatures);
  return lexedStructureWithAllElements;
};

export default markdownLexer;
export { markdownLexer };
