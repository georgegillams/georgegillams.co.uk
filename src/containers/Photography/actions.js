import { createRoutine } from 'redux-saga-routines';

import { LOAD_PHOTOS } from './constants';

export const loadPhotos = createRoutine(LOAD_PHOTOS);
