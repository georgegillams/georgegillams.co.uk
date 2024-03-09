import produce from 'immer';

import { loadBooks, deleteBook, updateBook } from './actions';

export const initialState = {
  books: null,
  loadingBooks: false,
  loadBooksError: null,

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
