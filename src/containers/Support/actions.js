import { createRoutine } from 'redux-saga-routines';

import { LOAD_LINKS, CREATE_LINK, DELETE_LINK } from './constants';

export const loadLinks = createRoutine(LOAD_LINKS);
export const createLink = createRoutine(CREATE_LINK);
export const deleteLink = createRoutine(DELETE_LINK);
