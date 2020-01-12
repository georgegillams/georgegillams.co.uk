import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';

import { constants, actions, selectors } from './redux-definitions';
const { MAKE_PAYMENT, LOAD_PAYMENT } = constants;
const {
  makePaymentRegisterError,
  makePaymentRegisterSuccess,

  loadPayment,
  loadPaymentRegisterError,
  loadPaymentRegisterSuccess,
} = actions;
const {
  makeSelectPaymentToken,
  makeSelectPaymentId,
  makeSelectPayment,
} = selectors;

import request from 'utils/request';

const paymentSuccessMessage = {
  type: 'success',
  message: 'Payment recieved',
};

export function* doLoadPayment() {
  const paymentId = yield select(makeSelectPaymentId());
  const requestURL = `${API_ENDPOINT}/makePayment/load`;

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ paymentId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentResult.error) {
      yield put(loadPaymentRegisterError(paymentResult));
      yield put(pushMessage({ type: 'error', message: paymentResult.error }));
    } else {
      yield put(loadPaymentRegisterSuccess(paymentResult));
    }
  } catch (err) {
    yield put(loadPaymentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doMakePayment() {
  const payment = yield select(makeSelectPayment());
  const paymentToken = yield select(makeSelectPaymentToken());
  const requestURL = `${API_ENDPOINT}/makePayment/pay`;

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        paymentToken,
        paymentAmount: payment.outstandingBalance,
        paymentId: payment.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentResult.error) {
      yield put(makePaymentRegisterError(paymentResult));
      yield put(pushMessage({ type: 'error', message: paymentResult.error }));
    } else {
      yield put(makePaymentRegisterSuccess());
      yield put(loadPayment(payment.id));
      yield put(pushMessage(paymentSuccessMessage));
    }
  } catch (err) {
    yield put(makePaymentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* updateUserDetails() {
  yield takeLatest(LOAD_PAYMENT, () => doLoadPayment());
  yield takeLatest(MAKE_PAYMENT, () => doMakePayment());
}
