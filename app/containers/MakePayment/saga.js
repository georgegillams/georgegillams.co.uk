import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, actions, selectors } from './redux-definitions';

import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const {
  MAKE_PAYMENT_INTENT,
  LOAD_PAYMENT,
  MAKE_PAYMENT_REGISTER_SUCCESS,
  MAKE_PAYMENT_REGISTER_ERROR,
} = constants;
const {
  makePaymentIntentRegisterError,
  makePaymentIntentRegisterSuccess,

  loadPaymentRegisterError,
  loadPaymentRegisterSuccess,
} = actions;
const {
  makeSelectPaymentId,
  makeSelectOnMakePaymentIntentRegisterSuccess,
} = selectors;

export function* doLoadPayment() {
  const paymentId = yield select(makeSelectPaymentId());
  const requestURL = apiStructure.loadPayment.fullPath;

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
      yield put(
        pushMessage({ type: 'error', message: paymentResult.errorMessage }),
      );
    } else {
      yield put(loadPaymentRegisterSuccess(paymentResult));
    }
  } catch (err) {
    yield put(loadPaymentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doMakePaymentIntent() {
  const paymentId = yield select(makeSelectPaymentId());
  const requestURL = apiStructure.createPaymentIntent.fullPath;
  const onMakePaymentIntentRegisterSuccess = yield select(
    makeSelectOnMakePaymentIntentRegisterSuccess(),
  );

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ paymentId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentResult.error) {
      yield put(makePaymentIntentRegisterError(paymentResult));
      yield put(
        pushMessage({ type: 'error', message: paymentResult.errorMessage }),
      );
    } else {
      yield put(makePaymentIntentRegisterSuccess(paymentResult));
      if (onMakePaymentIntentRegisterSuccess) {
        onMakePaymentIntentRegisterSuccess(
          paymentResult.paymentIntentClientSecret,
        );
      }
    }
  } catch (err) {
    yield put(makePaymentIntentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_PAYMENT, doLoadPayment);
  yield takeLatest(MAKE_PAYMENT_INTENT, doMakePaymentIntent);

  // The saga doesn't actually handle these interactions as they have to be performed by the stripe library.
  // However, when the actions have completed we'll reload the payment to ensure that the UI is up to date.
  yield takeLatest(MAKE_PAYMENT_REGISTER_SUCCESS, doLoadPayment);
  yield takeLatest(MAKE_PAYMENT_REGISTER_ERROR, doLoadPayment);
}
