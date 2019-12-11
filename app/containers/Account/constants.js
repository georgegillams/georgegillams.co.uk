import actionMeta from './actionMeta';

const { actionDefinitions } = actionMeta;

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'meta-redux/dist/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
