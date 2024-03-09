import { createRoutine } from 'redux-saga-routines';

import { LOAD_BOOKS, UPDATE_BOOK, DELETE_BOOK } from './constants';

export const loadBooks = createRoutine(LOAD_BOOKS);
export const updateBook = createRoutine(UPDATE_BOOK);
export const deleteBook = createRoutine(DELETE_BOOK);
