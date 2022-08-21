import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { loadPhotos } from './actions';

export function* doLoadPhotos() {
  const requestURL = apiStructure.loadShowcaseImages.fullPath;

  try {
    yield put(loadPhotos.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadPhotos.failure(result));
    } else {
      yield put(loadPhotos.success(result));
    }
  } catch (err) {
    yield put(loadPhotos.failure(err));
  } finally {
    yield put(loadPhotos.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadPhotos.TRIGGER, doLoadPhotos);
}
