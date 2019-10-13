import constants from './constants';
import actionMeta from './actionMeta';

import defineActions, { populateConstants } from 'helpers/redux/actions';

module.exports = defineActions(
  populateConstants(actionMeta.actionDefinitions, constants),
);
