import { put, takeLatest } from 'redux-saga/effects';

import { loadBooks, deleteBook } from '../actions';

import saga, { doLoadBooks, doDeleteBook } from '../saga';

describe('BookList saga', () => {
  let mainSaga;

  beforeEach(() => {
    mainSaga = saga();
  });

  it('Should load books on loadBooks TRIGGER', () => {
    const takeLatestDescriptor = mainSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadBooks.TRIGGER, doLoadBooks));
  });

  describe('loadBooks actions', () => {
    let loadBooksGenerator;

    const response = {
      books: 'list of books',
      status: 200,
    };

    beforeEach(() => {
      loadBooksGenerator = doLoadBooks();

      const selectDescriptor = loadBooksGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call loadBooks.success on successful API call', () => {
      loadBooksGenerator.next({ highlightedBook: null });
      loadBooksGenerator.next();
      const putSuccess = loadBooksGenerator.next(response).value;
      loadBooksGenerator.next();

      expect(putSuccess).toEqual(put(loadBooks.success(response)));
    });

    it('Should call loadBooks.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      loadBooksGenerator.next({ highlightedBook: null });
      loadBooksGenerator.next();
      const putSuccess = loadBooksGenerator.next(response).value;
      loadBooksGenerator.next();

      expect(putSuccess).toEqual(put(loadBooks.failure(response)));
    });

    it('Should call loadBooks.failure if an exception occurs', () => {
      const response = new Error('Some error');
      loadBooksGenerator.next({ highlightedBook: null });
      const putFailure = loadBooksGenerator.throw(response).value;

      expect(putFailure).toEqual(put(loadBooks.failure(response)));
    });
  });

  describe('deleteBook actions', () => {
    let deleteBookGenerator;

    const response = {
      status: 200,
    };

    beforeEach(() => {
      deleteBookGenerator = doDeleteBook();

      const selectDescriptor = deleteBookGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
    });

    it('Should call deleteBook.success on successful API call', () => {
      deleteBookGenerator.next({ bookToDelete: 'some-book-id' });
      deleteBookGenerator.next();
      const putSuccess = deleteBookGenerator.next(response).value;
      deleteBookGenerator.next();

      expect(putSuccess).toEqual(put(deleteBook.success()));
    });

    it('Should call deleteBook.failure if API returns error', () => {
      const response = {
        error: 'error_type',
        errorMessage: 'Error message',
        status: 500,
      };
      deleteBookGenerator.next({ bookToDelete: 'some-book-id' });
      deleteBookGenerator.next();
      const putSuccess = deleteBookGenerator.next(response).value;
      deleteBookGenerator.next();

      expect(putSuccess).toEqual(put(deleteBook.failure(response)));
    });

    it('Should call deleteBook.failure if an exception occurs', () => {
      const response = new Error('Some error');
      deleteBookGenerator.next({ bookToDelete: 'some-book-id' });
      const putFailure = deleteBookGenerator.throw(response).value;

      expect(putFailure).toEqual(put(deleteBook.failure(response)));
    });
  });
});
