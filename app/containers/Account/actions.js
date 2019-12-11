import constants from './constants';
import actionMeta from './actionMeta';

import {defineActions, populateConstants } from 'meta-redux';

const { actionDefinitions } = actionMeta;

module.exports = defineActions(populateConstants(actionDefinitions, constants));
