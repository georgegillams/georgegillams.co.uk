import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_GTS_LATEST } from './constants';
import { gtsLatestLoaded, gtsLatestLoadingError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

export function* getGtsLatest() {
  const requestURL = `${API_ENDPOINT}/gts/loadLatest`;

  try {
    const gtsLatest = yield call(request, requestURL);
    yield put(gtsLatestLoaded(gtsLatest));
  } catch (err) {
    yield put(gtsLatestLoadingError(err));
  }
}

export default function* gtsDataLatest() {
  yield takeLatest(LOAD_GTS_LATEST, getGtsLatest);
}
