import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOGS, DELETE_BLOG, CREATE_BLOG } from './constants';
import {
  loadBlogs,
  deleteBlogSuccess,
  deleteBlogError,
  loadBlogsSuccess,
  loadBlogsError,
  createBlogSuccess,
  createBlogError,
} from './actions';
import { makeSelectBlogToDelete, makeSelectCreateBlogId } from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';

import request from 'utils/request';

const blogsLoadedMessage = { type: 'success', message: 'Blogs loaded!' };
const blogsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load blogs.',
};

const blogCreatedMessage = { type: 'success', message: 'Blog created!' };
const blogCreateErrorMessage = {
  type: 'error',
  message: 'Could not create blog.',
};

const blogDeletedMessage = { type: 'success', message: 'Blog deleted!' };
const blogDeleteErrorMessage = {
  type: 'error',
  message: 'Could not delete blog.',
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

export function* doCreateBlog() {
  const id = yield select(makeSelectCreateBlogId());
  const blogDeleteUrl = `${API_ENDPOINT}/blogs/create`;

  try {
    const blogCreateResult = yield call(request, blogDeleteUrl, {
      method: 'POST',
      body: JSON.stringify({ requestedId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (blogCreateResult.error) {
      yield put(createBlogError(blogCreateResult));
      yield put(pushMessage(blogCreateErrorMessage));
    } else {
      yield put(createBlogSuccess(blogCreateResult));
      yield put(pushMessage(blogCreatedMessage));
      yield put(loadBlogs());
    }
  } catch (err) {
    yield put(deleteBlogError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeleteBlog() {
  const blogToDelete = yield select(makeSelectBlogToDelete());
  const blogDeleteUrl = `${API_ENDPOINT}/blogs/remove`;

  try {
    const blogDeleteResult = yield call(request, blogDeleteUrl, {
      method: 'POST',
      body: JSON.stringify(blogToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (blogDeleteResult.error) {
      yield put(deleteBlogError(blogDeleteResult));
      yield put(pushMessage(blogDeleteErrorMessage));
    } else {
      yield put(deleteBlogSuccess(blogDeleteResult));
      yield put(pushMessage(blogDeletedMessage));
      yield put(loadBlogs());
    }
  } catch (err) {
    yield put(deleteBlogError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_BLOGS, () => doLoadBlogs());
  yield takeLatest(CREATE_BLOG, () => doCreateBlog());
  yield takeLatest(DELETE_BLOG, () => doDeleteBlog());
}
