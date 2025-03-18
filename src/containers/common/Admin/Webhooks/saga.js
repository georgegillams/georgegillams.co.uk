import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { loadEndpoints, createEndpoint, updateEndpoint, removeEndpoint } from './actions';

export function* doLoadEndpoint() {
  const requestURL = apiStructure.loadWebhookEndpoints.fullPath;

  try {
    yield put(loadEndpoints.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(loadEndpoints.failure(result));
    } else {
      yield put(loadEndpoints.success(result.webhookEndpoints));
    }
  } catch (err) {
    yield put(loadEndpoints.failure(err));
  } finally {
    yield put(loadEndpoints.fulfill());
  }
}

export function* doCreateEndpoint() {
  const currentState = yield select(selectState());
  const { webhookEndpointToCreate } = currentState;
  const requestURL = apiStructure.createWebhookEndpoint.fullPath;

  try {
    yield put(createEndpoint.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(webhookEndpointToCreate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(createEndpoint.failure(result));
    } else {
      yield put(createEndpoint.success(result));
      yield put(loadEndpoints.trigger());
    }
  } catch (err) {
    yield put(createEndpoint.failure(err));
  } finally {
    yield put(createEndpoint.fulfill());
  }
}

export function* doUpdateEndpoint() {
  const currentState = yield select(selectState());
  const { webhookEndpointToUpdate } = currentState;
  const requestURL = apiStructure.updateWebhookEndpoint.fullPath;

  try {
    yield put(updateEndpoint.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(webhookEndpointToUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(updateEndpoint.failure(result));
    } else {
      yield put(updateEndpoint.success(result));
      yield put(loadEndpoints.trigger());
    }
  } catch (err) {
    yield put(updateEndpoint.failure(err));
  } finally {
    yield put(updateEndpoint.fulfill());
  }
}

export function* doRemoveEndpoint() {
  const currentState = yield select(selectState());
  const { webhookEndpointToRemove } = currentState;
  const requestURL = apiStructure.deleteWebhookEndpoint.fullPath;

  try {
    yield put(removeEndpoint.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(webhookEndpointToRemove),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(removeEndpoint.failure(result));
    } else {
      yield put(removeEndpoint.success(result));
      yield put(loadEndpoints.trigger());
    }
  } catch (err) {
    yield put(removeEndpoint.failure(err));
  } finally {
    yield put(removeEndpoint.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadEndpoints.TRIGGER, doLoadEndpoint);
  yield takeLatest(createEndpoint.TRIGGER, doCreateEndpoint);
  yield takeLatest(updateEndpoint.TRIGGER, doUpdateEndpoint);
  yield takeLatest(removeEndpoint.TRIGGER, doRemoveEndpoint);
}
