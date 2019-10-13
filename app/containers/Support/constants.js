import actionMeta from './actionMeta';

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'helpers/redux/constants';

const inferedConstants = inferConstantsFromActionDefinitions(
  actionMeta.actionDefinitions,
);
console.log(`inferedConstants`, inferedConstants);

const constants = defineConstants(...inferedConstants);
console.log(`constants`, constants);

module.exports = constants;
