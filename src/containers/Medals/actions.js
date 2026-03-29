import { createRoutine } from 'redux-saga-routines';

import { CREATE_MEDAL, DELETE_MEDAL, LOAD_MEDALS, UPDATE_MEDAL } from './constants';

export const loadMedals = createRoutine(LOAD_MEDALS);
export const createMedal = createRoutine(CREATE_MEDAL);
export const updateMedal = createRoutine(UPDATE_MEDAL);
export const deleteMedal = createRoutine(DELETE_MEDAL);
