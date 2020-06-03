import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, actions, selectors } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_BLOG } = constants;
const { loadBlogRegisterSuccess, loadBlogRegisterError } = actions;
const { makeSelectBlogId } = selectors;

export function* doLoadBlog() {
  const blogId = yield select(makeSelectBlogId());
  const requestURL = apiStructure.loadBlog.fullPath.split(':id').join(blogId);
  console.log(`requestURL`, requestURL);

  try {
    const result = yield call(request, requestURL);
    console.log(`result`, result);
    if (result.error) {
      yield put(loadBlogRegisterError(result.error));
    }
    yield put(loadBlogRegisterSuccess(result));
  } catch (err) {
    console.log('err', err);
    yield put(loadBlogRegisterError(err));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_BLOG, doLoadBlog);
}
