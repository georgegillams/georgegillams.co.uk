import actionMeta from './actionMeta';

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'helpers/redux/constants';

const inferedConstants = inferConstantsFromActionDefinitions(
  actionMeta.actionDefinitions,
);

const constants = defineConstants(...inferedConstants);

module.exports = constants;
