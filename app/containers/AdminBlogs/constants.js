import actionDefinitions from './actionDefinitions';

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'meta-redux/dist/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
