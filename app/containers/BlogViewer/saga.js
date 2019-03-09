import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOG } from './constants';
import { blogLoaded, blogLoadingError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';
import { makeSelectBlogId } from './selectors';

import request from 'utils/request';

export function* loadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const requestURL = `${API_ENDPOINT}/blogs/loadSingle?id=${blogId}`;

  try {
    const blog = yield call(request, requestURL);
    yield put(blogLoaded(blog));
  } catch (err) {
    yield put(blogLoadingError(err));
  }
}

export default function* getBlog() {
  yield takeLatest(LOAD_BLOG, loadBlog);
}
