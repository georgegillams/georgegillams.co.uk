import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'utils/common/request';
import apiStructure from 'helpers/apiStructure';

import { loadAuth } from './actions';

export function* doLoadAuth() {
  const requestURL = apiStructure.loadAuth.fullPath;

  try {
    yield put(loadAuth.request());

    const result = yield call(request, requestURL);

    yield put(loadAuth.success(result));
  } catch (err) {
    yield put(loadAuth.failure(err));
  } finally {
    yield put(loadAuth.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadAuth.TRIGGER, doLoadAuth);
}