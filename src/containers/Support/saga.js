import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'utils/common/request';
import apiStructure from 'helpers/apiStructure';

import { selectState } from './selectors';
import { loadLinks, createLink, deleteLink } from './actions';

export function* doLoadLinks() {
  const requestURL = apiStructure.loadSupport.fullPath;

  try {
    yield put(loadLinks.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadLinks.failure(result));
    } else {
      yield put(loadLinks.success(result));
    }
  } catch (err) {
    yield put(loadLinks.failure(err));
  } finally {
    yield put(loadLinks.fulfill());
  }
}

export function* doCreateLink() {
  const currentState = yield select(selectState());
  const { linkToCreate } = currentState;
  const requestURL = apiStructure.createSupport.fullPath;

  try {
    yield put(createLink.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(linkToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(createLink.failure(result));
    } else {
      yield put(createLink.success(result));
    }
    yield put(loadLinks.trigger());
  } catch (err) {
    yield put(createLink.failure(err));
  } finally {
    yield put(createLink.fulfill());
  }
}

export function* doDeleteLink() {
  const currentState = yield select(selectState());
  const { linkToDelete } = currentState;
  const requestURL = apiStructure.deleteSupport.fullPath;

  try {
    yield put(deleteLink.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(linkToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(deleteLink.failure(result));
    } else {
      yield put(deleteLink.success(result));
    }
    yield put(loadLinks.trigger());
  } catch (err) {
    yield put(deleteLink.failure(err));
  } finally {
    yield put(deleteLink.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadLinks.TRIGGER, doLoadLinks);
  yield takeLatest(createLink.TRIGGER, doCreateLink);
  yield takeLatest(deleteLink.TRIGGER, doDeleteLink);
}
