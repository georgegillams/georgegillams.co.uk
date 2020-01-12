import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';

import { constants, actions, selectors } from './redux-definitions';
const { MAKE_PAYMENT } = constants;
const { makePaymentError, makePaymentSuccess } = actions;
const { makeSelectPaymentToken } = selectors;

import request from 'utils/request';

const paymentSuccessMessage = {
  type: 'success',
  message: 'Payment recieved',
};

export function* doMakePayment() {
  const paymentAmount = yield select(makeSelectBalance());
  const paymentToken = yield select(makeSelectPaymentToken());
  const requestURL = `${API_ENDPOINT}/stripePayments/pay`;

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ paymentToken, paymentAmount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentResult.error) {
      yield put(makePaymentError(paymentResult));
      yield put(pushMessage({ type: 'error', message: paymentResult.error }));
    } else {
      yield put(makePaymentSuccess());
      yield put(loadBalance());
      yield put(loadUserTicket());
      yield put(pushMessage(paymentSuccessMessage));
    }
  } catch (err) {
    yield put(makePaymentError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* updateUserDetails() {
  yield takeLatest(MAKE_PAYMENT, () => doMakePayment());
}
