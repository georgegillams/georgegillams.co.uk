import { createRoutine } from 'redux-saga-routines';

import { CREATE_BOOK, LOAD_BOOKS, UPDATE_BOOK, DELETE_BOOK, SET_HIGHLIGHTED_BOOK } from './constants';

export const loadBooks = createRoutine(LOAD_BOOKS);
export const createBook = createRoutine(CREATE_BOOK);
export const updateBook = createRoutine(UPDATE_BOOK);
export const deleteBook = createRoutine(DELETE_BOOK);
export const setHighlightedBook = createRoutine(SET_HIGHLIGHTED_BOOK);
