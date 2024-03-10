import produce from 'immer';

import { loadBooks, deleteBook, updateBook, createBook, setHighlightedBook } from './actions';

export const initialState = {
  highlightedBook: null,

  books: null,
  loadingBooks: false,
  loadBooksError: null,

  bookToCreate: null,
  creatingBook: false,
  createBookError: null,

  bookToUpdate: null,
  updatingBook: false,
  updateBookError: null,

  bookToDelete: null,
  deletingBook: false,
  deleteBookError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case setHighlightedBook.TRIGGER:
        draft.highlightedBook = payload;
        break;

      case loadBooks.REQUEST:
        draft.loadingBooks = true;
        draft.loadBooksError = null;
        break;

      case loadBooks.SUCCESS:
        draft.loadingBooks = false;
        draft.books = payload.books;
        break;

      case loadBooks.FAILURE:
        draft.loadingBooks = false;
        draft.loadBooksError = payload;
        break;

      case createBook.TRIGGER:
        draft.bookToCreate = payload;
        break;

      case createBook.REQUEST:
        draft.creatingBook = true;
        draft.createBookError = null;
        break;

      case createBook.SUCCESS:
        draft.creatingBook = false;
        break;

      case createBook.FAILURE:
        draft.creatingBook = false;
        draft.createBookError = payload;
        break;

      case updateBook.TRIGGER:
        draft.bookToUpdate = payload;
        break;

      case updateBook.REQUEST:
        draft.updatingBook = true;
        draft.updateBookError = null;
        break;

      case updateBook.SUCCESS:
        draft.updatingBook = false;
        break;

      case updateBook.FAILURE:
        draft.updatingBook = false;
        draft.updateBookError = payload;
        break;

      case deleteBook.TRIGGER:
        draft.bookToDelete = payload;
        break;

      case deleteBook.REQUEST:
        draft.deletingBook = true;
        draft.deleteBookError = null;
        break;

      case deleteBook.SUCCESS:
        draft.deletingBook = false;
        break;

      case deleteBook.FAILURE:
        draft.deletingBook = false;
        draft.deleteBookError = payload;
        break;
    }
  });

export default reducer;
