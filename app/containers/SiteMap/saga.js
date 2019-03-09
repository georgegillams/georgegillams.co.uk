import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOGS } from './constants';
import { blogsLoaded, blogsLoadingError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

export function* loadBlogs() {
  const requestURL = `${API_ENDPOINT}/blogs/load`;

  try {
    const blogs = yield call(request, requestURL); // Can add third arg for options
    yield put(blogsLoaded(blogs));
  } catch (err) {
    yield put(blogsLoadingError(err));
  }
}

export default function* getBlogs() {
  yield takeLatest(LOAD_BLOGS, loadBlogs);
}
