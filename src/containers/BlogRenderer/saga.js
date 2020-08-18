import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'utils/common/request';
import apiStructure from 'helpers/apiStructure';

import { selectState } from './selectors';
import { loadBlog, updateBlog } from './actions';

export function* doLoadBlog() {
  const currentState = yield select(selectState());
  const { blogId } = currentState;
  const requestURL = apiStructure.loadBlog.fullPath.split(':id').join(blogId);

  try {
    yield put(loadBlog.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadBlog.failure(result));
    } else {
      yield put(loadBlog.success(result));
    }
  } catch (err) {
    yield put(loadBlog.failure(err));
  } finally {
    yield put(loadBlog.fulfill());
  }
}

export function* doUpdateBlog() {
  const currentState = yield select(selectState());
  const { blogToUpdate } = currentState;
  const requestURL = apiStructure.updateBlog.fullPath;

  try {
    yield put(updateBlog.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(blogToUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(updateBlog.failure(result));
    } else {
      yield put(updateBlog.success(result));
    }
    yield put(loadBlog.trigger(blogToUpdate.id));
  } catch (err) {
    yield put(updateBlog.failure(err));
  } finally {
    yield put(updateBlog.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadBlog.TRIGGER, doLoadBlog);
  yield takeLatest(updateBlog.TRIGGER, doUpdateBlog);
}
