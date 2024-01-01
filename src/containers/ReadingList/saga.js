import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';
import { selectState } from './selectors';

import { loadBooks, deleteBook } from './actions';

export function* doLoadBooks() {
  const requestURL = apiStructure.loadBooks.fullPath;

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
  } catch (err) {
    yield put(loadBooks.failure(err));
  } finally {
    yield put(loadBooks.fulfill());
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
  yield takeLatest(deleteBook.TRIGGER, doDeleteBook);
}
