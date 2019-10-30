import constants from './constants';
import actionMeta from './actionMeta';

const { actionDefinitions } = actionMeta;

import defineActions, { populateConstants } from 'helpers/redux/actions';

module.exports = defineActions(populateConstants(actionDefinitions, constants));
