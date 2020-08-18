import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'utils/common/request';
import apiStructure from 'helpers/apiStructure';
import { selectState } from './selectors';

import { loadBlogs, deleteBlog } from './actions';

export function* doLoadBlogs() {
  const requestURL = apiStructure.loadBlogs.fullPath;

  try {
    yield put(loadBlogs.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadBlogs.failure(result));
    } else {
      yield put(loadBlogs.success(result));
    }
  } catch (err) {
    yield put(loadBlogs.failure(err));
  } finally {
    yield put(loadBlogs.fulfill());
  }
}

export function* doDeleteBlog() {
  const currentState = yield select(selectState());
  const { blogToDelete } = currentState;
  const requestURL = apiStructure.deleteBlog.fullPath;

  try {
    yield put(deleteBlog.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ id: blogToDelete }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(deleteBlog.failure(result));
    } else {
      yield put(deleteBlog.success());
    }
    yield put(loadBlogs.trigger());
  } catch (err) {
    yield put(deleteBlog.failure(err));
  } finally {
    yield put(deleteBlog.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadBlogs.TRIGGER, doLoadBlogs);
  yield takeLatest(deleteBlog.TRIGGER, doDeleteBlog);
}
