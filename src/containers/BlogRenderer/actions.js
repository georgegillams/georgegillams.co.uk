import { createRoutine } from 'redux-saga-routines';

import { LOAD_BLOG, UPDATE_BLOG } from './constants';

export const loadBlog = createRoutine(LOAD_BLOG);
export const updateBlog = createRoutine(UPDATE_BLOG);
