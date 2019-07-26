import { LOAD_MONZO, LOAD_TRANSACTIONS } from './constants';
import {
  loadMonzoSuccess,
  loadMonzoError,
  loadTransactionsSuccess,
  loadTransactionsError,
} from './actions';
import { makeSelectPassword } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const monzoLoadSuccessMessage = {
  type: 'success',
  message: 'Monzo pot data loaded.',
};

export function* doLoadTransactions() {
  const password = yield select(makeSelectPassword());
  const requestURL = `${API_ENDPOINT}/monzo/loadLatestTransactions`;

  try {
    const monzoResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (monzoResult.error) {
      yield put(loadTransactionsError(monzoResult));
      yield put(pushMessage({ type: 'error', message: monzoResult.error }));
    } else if (monzoResult.warning) {
      yield put(pushMessage({ type: 'warn', message: monzoResult.warning }));
    } else {
      yield put(loadTransactionsSuccess(monzoResult));
    }
  } catch (err) {
    yield put(loadTransactionsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadMonzo() {
  const password = yield select(makeSelectPassword());
  const requestURL = `${API_ENDPOINT}/monzo/loadPots`;

  try {
    const monzoResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (monzoResult.error) {
      yield put(loadMonzoError(monzoResult));
      yield put(pushMessage({ type: 'error', message: monzoResult.error }));
    } else if (monzoResult.warning) {
      yield put(pushMessage({ type: 'warn', message: monzoResult.warning }));
    } else {
      yield put(loadMonzoSuccess(monzoResult));
      yield put(pushMessage(monzoLoadSuccessMessage));
    }
  } catch (err) {
    yield put(loadMonzoError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_MONZO, doLoadMonzo);
  yield takeLatest(LOAD_TRANSACTIONS, doLoadTransactions);
}
