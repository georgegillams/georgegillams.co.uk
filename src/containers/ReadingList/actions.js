import { createRoutine } from 'redux-saga-routines';

import { LOAD_BOOKS, DELETE_BOOK } from './constants';

export const loadBooks = createRoutine(LOAD_BOOKS);
export const deleteBook = createRoutine(DELETE_BOOK);
