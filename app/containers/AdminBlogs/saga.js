import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOGS } from './constants';
import { loadBlogsSuccess, loadBlogsError } from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { associate } from 'helpers/objects';

import request from 'utils/request';

const blogsLoadedMessage = { type: 'success', message: 'Blogs loaded!' };
const blogsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load blogs.',
};

export function* doLoadBlogs() {
  const blogsRequestURL = `${API_ENDPOINT}/blogs/load`;

  try {
    const blogsResult = yield call(request, blogsRequestURL, {
      method: 'GET',
    });
    if (blogsResult.error) {
      yield put(loadBlogsError(blogsResult));
      yield put(pushMessage(blogsLoadErrorMessage));
    } else {
      yield put(loadBlogsSuccess(blogsResult));
      yield put(pushMessage(blogsLoadedMessage));
    }
  } catch (err) {
    yield put(loadBlogsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_BLOGS, () => doLoadBlogs());
}
