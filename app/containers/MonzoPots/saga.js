import { actions, selectors, constants } from './redux-definitions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const {
  loadPotsRegisterSuccess,
  loadPotsRegisterError,
  loadTransactionsRegisterSuccess,
  loadTransactionsRegisterError,
} = actions;
const { LOAD_POTS, LOAD_TRANSACTIONS } = constants;
const { makeSelectPassword } = selectors;

const monzoLoadSuccessMessage = {
  type: 'success',
  message: 'Monzo pot data loaded.',
};

export function* doLoadTransactions() {
  const password = yield select(makeSelectPassword());
  console.log(`password`, password);
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
      yield put(loadTransactionsRegisterError(monzoResult));
      yield put(pushMessage({ type: 'error', message: monzoResult.error }));
    } else if (monzoResult.warning) {
      yield put(pushMessage({ type: 'warn', message: monzoResult.warning }));
    } else {
      yield put(loadTransactionsRegisterSuccess(monzoResult));
    }
  } catch (err) {
    yield put(loadTransactionsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadPots() {
  const password = yield select(makeSelectPassword());
  console.log(`password`, password);
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
      yield put(loadPotsRegisterError(monzoResult));
      yield put(pushMessage({ type: 'error', message: monzoResult.error }));
    } else if (monzoResult.warning) {
      yield put(pushMessage({ type: 'warn', message: monzoResult.warning }));
    } else {
      yield put(loadPotsRegisterSuccess(monzoResult));
      yield put(pushMessage(monzoLoadSuccessMessage));
    }
  } catch (err) {
    yield put(loadPotsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_POTS, doLoadPots);
  yield takeLatest(LOAD_TRANSACTIONS, doLoadTransactions);
}
