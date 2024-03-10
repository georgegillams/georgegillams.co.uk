import bookListReducer from '../reducer';
import { loadBooks, deleteBook } from '../actions';
import { initialState } from '../reducer';

describe('bookListReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(bookListReducer(undefined, {})).toEqual(state);
  });

  describe('loadBooks actions', () => {
    it('should handle the action loadBooks.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loadingBooks: true,
      };

      expect(bookListReducer(state, loadBooks.request())).toEqual(expectResult);
    });

    it('should return the action loadBooks.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        books: 'Some books',
      };

      expect(bookListReducer(state, loadBooks.success({ books: 'Some books' }))).toEqual(expectResult);
    });

    it('should return the action loadBooks.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadBooksError: 'some error',
      };

      expect(bookListReducer(state, loadBooks.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('deleteBook actions', () => {
    it('should handle the action deleteBook.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        deletingBook: true,
      };

      expect(bookListReducer(state, deleteBook.request())).toEqual(expectResult);
    });

    it('should return the action deleteBook.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(bookListReducer(state, deleteBook.success())).toEqual(expectResult);
    });

    it('should return the action deleteBook.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        deleteBookError: 'some error',
      };

      expect(bookListReducer(state, deleteBook.failure('some error'))).toEqual(expectResult);
    });
  });
});
