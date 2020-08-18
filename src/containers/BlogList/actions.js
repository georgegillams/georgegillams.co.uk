import { createRoutine } from 'redux-saga-routines';

import { LOAD_BLOGS, DELETE_BLOG } from './constants';

export const loadBlogs = createRoutine(LOAD_BLOGS);
export const deleteBlog = createRoutine(DELETE_BLOG);
