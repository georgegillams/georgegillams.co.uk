import constants from './constants';
import actionDefinitions from './actionDefinitions';

import defineActions, { populateConstants } from 'meta-redux/dist/actions';

module.exports = defineActions(populateConstants(actionDefinitions, constants));
