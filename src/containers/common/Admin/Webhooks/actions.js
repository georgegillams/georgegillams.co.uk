import { createRoutine } from 'redux-saga-routines';

import { LOAD_ENDPOINTS, CREATE_ENDPOINT, REMOVE_ENDPOINT, UPDATE_ENDPOINT } from './constants';

export const loadEndpoints = createRoutine(LOAD_ENDPOINTS);
export const createEndpoint = createRoutine(CREATE_ENDPOINT);
export const updateEndpoint = createRoutine(UPDATE_ENDPOINT);
export const removeEndpoint = createRoutine(REMOVE_ENDPOINT);
