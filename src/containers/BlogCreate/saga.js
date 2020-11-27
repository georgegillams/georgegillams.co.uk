import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';
import { selectState } from './selectors';

import { createBlog } from './actions';

export function* doCreateBlog() {
  const currentState = yield select(selectState());
  const { blogToCreate } = currentState;
  const requestURL = apiStructure.createBlog.fullPath;

  try {
    yield put(createBlog.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(blogToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(createBlog.failure(result));
    } else {
      yield put(createBlog.success(result));
      window.location = `/blog/${result.id}`;
    }
  } catch (err) {
    yield put(createBlog.failure(err));
  } finally {
    yield put(createBlog.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(createBlog.TRIGGER, doCreateBlog);
}
