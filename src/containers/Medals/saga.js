import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';
import { selectState } from './selectors';

import { loadMedals, deleteMedal, updateMedal, createMedal } from './actions';

export function* doLoadMedals() {
  const requestURL = apiStructure.loadMedals.fullPath;

  try {
    yield put(loadMedals.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadMedals.failure(result));
    } else {
      yield put(loadMedals.success(result));
    }
  } catch (err) {
    yield put(loadMedals.failure(err));
  } finally {
    yield put(loadMedals.fulfill());
  }
}

export function* doCreateMedal() {
  const currentState = yield select(selectState());
  const { medalToCreate } = currentState;
  const requestURL = apiStructure.createMedal.fullPath;

  try {
    yield put(createMedal.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(medalToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(createMedal.failure(result));
    } else {
      yield put(createMedal.success(result));
    }
    yield put(loadMedals.trigger());
  } catch (err) {
    yield put(createMedal.failure(err));
  } finally {
    yield put(createMedal.fulfill());
  }
}

export function* doUpdateMedal() {
  const currentState = yield select(selectState());
  const { medalToUpdate } = currentState;
  const requestURL = apiStructure.updateMedal.fullPath;

  try {
    yield put(updateMedal.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(medalToUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(updateMedal.failure(result));
    } else {
      yield put(updateMedal.success(result));
    }
    yield put(loadMedals.trigger());
  } catch (err) {
    yield put(updateMedal.failure(err));
  } finally {
    yield put(updateMedal.fulfill());
  }
}

export function* doDeleteMedal() {
  const currentState = yield select(selectState());
  const { medalToDelete } = currentState;
  const requestURL = apiStructure.deleteMedal.fullPath;

  try {
    yield put(deleteMedal.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ id: medalToDelete }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(deleteMedal.failure(result));
    } else {
      yield put(deleteMedal.success());
    }
    yield put(loadMedals.trigger());
  } catch (err) {
    yield put(deleteMedal.failure(err));
  } finally {
    yield put(deleteMedal.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadMedals.TRIGGER, doLoadMedals);
  yield takeLatest(createMedal.TRIGGER, doCreateMedal);
  yield takeLatest(updateMedal.TRIGGER, doUpdateMedal);
  yield takeLatest(deleteMedal.TRIGGER, doDeleteMedal);
}
