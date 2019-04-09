import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOG, UPDATE_BLOG } from './constants';
import {
  loadBlogSuccess,
  loadBlogError,
  updateBlogError,
  updateBlogSuccess,
} from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { associate } from 'helpers/objects';
import { makeSelectBlogId, makeSelectNewBlog } from './selectors';

import request from 'utils/request';

const blogLoadedMessage = { type: 'success', message: 'Blog loaded!' };
const blogLoadErrorMessage = {
  type: 'error',
  message: 'Could not load blog.',
};

const blogUpdatedMessage = { type: 'success', message: 'Blog updated!' };
const blogUpdatedErrorMessage = {
  type: 'error',
  message: 'Could not save blog.',
};

export function* doLoadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const blogsRequestURL = `${API_ENDPOINT}/blogs/loadSingle?id=${blogId}`;

  try {
    const blogResult = yield call(request, blogsRequestURL, {
      method: 'GET',
    });
    if (blogResult.error) {
      yield put(loadBlogError(blogResult));
      yield put(pushMessage(blogLoadErrorMessage));
    } else {
      yield put(loadBlogSuccess(blogResult));
      yield put(pushMessage(blogLoadedMessage));
    }
  } catch (err) {
    yield put(loadBlogError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateBlog() {
  const blog = yield select(makeSelectNewBlog());
  const blogsRequestURL = `${API_ENDPOINT}/blogs/update`;

  try {
    const updateResult = yield call(request, blogsRequestURL, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateBlogError(updateResult));
      yield put(pushMessage(blogUpdatedErrorMessage));
    } else {
      yield put(updateBlogSuccess(updateResult));
      yield put(pushMessage(blogUpdatedMessage));
    }
  } catch (err) {
    yield put(updateBlogError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_BLOG, () => doLoadBlog());
  yield takeLatest(UPDATE_BLOG, () => doUpdateBlog());
}
