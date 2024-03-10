import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';
import { selectState } from './selectors';

import { loadBooks, deleteBook, updateBook, createBook, setHighlightedBook } from './actions';

export function* doLoadBooks() {
  const requestURL = apiStructure.loadBooks.fullPath;
  const currentState = yield select(selectState());
  const { highlightedBook } = currentState;

  try {
    yield put(loadBooks.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadBooks.failure(result));
    } else {
      yield put(loadBooks.success(result));
    }
    if (highlightedBook) {
      setTimeout(() => {
        document.getElementById(highlightedBook)?.scrollIntoView?.({
          behavior: 'smooth',
        });
      }, 500);
    }
    yield put(setHighlightedBook.trigger(null));
  } catch (err) {
    yield put(loadBooks.failure(err));
  } finally {
    yield put(loadBooks.fulfill());
  }
}

export function* doCreateBook() {
  const currentState = yield select(selectState());
  const { bookToCreate } = currentState;
  const requestURL = apiStructure.createBook.fullPath;

  try {
    yield put(createBook.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(bookToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(createBook.failure(result));
    } else {
      yield put(createBook.success(result));
      yield put(setHighlightedBook.trigger(result.id));
    }
    yield put(loadBooks.trigger());
  } catch (err) {
    yield put(createBook.failure(err));
  } finally {
    yield put(createBook.fulfill());
  }
}

export function* doUpdateBook() {
  const currentState = yield select(selectState());
  const { bookToUpdate } = currentState;
  const requestURL = apiStructure.updateBook.fullPath;

  try {
    yield put(updateBook.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(bookToUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(updateBook.failure(result));
    } else {
      yield put(updateBook.success(result));
      yield put(setHighlightedBook.trigger(bookToUpdate.id));
    }
    yield put(loadBooks.trigger());
  } catch (err) {
    yield put(updateBook.failure(err));
  } finally {
    yield put(updateBook.fulfill());
  }
}

export function* doDeleteBook() {
  const currentState = yield select(selectState());
  const { bookToDelete } = currentState;
  const requestURL = apiStructure.deleteBook.fullPath;

  try {
    yield put(deleteBook.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ id: bookToDelete }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(deleteBook.failure(result));
    } else {
      yield put(deleteBook.success());
      yield put(setHighlightedBook.trigger(bookToDelete.id));
    }
    yield put(loadBooks.trigger());
  } catch (err) {
    yield put(deleteBook.failure(err));
  } finally {
    yield put(deleteBook.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadBooks.TRIGGER, doLoadBooks);
  yield takeLatest(createBook.TRIGGER, doCreateBook);
  yield takeLatest(updateBook.TRIGGER, doUpdateBook);
  yield takeLatest(deleteBook.TRIGGER, doDeleteBook);
}
