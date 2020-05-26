import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actions, selectors, constants } from './redux-definitions';

import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { LOAD_PAYMENTS, ADD_PAYMENT, DELETE_PAYMENT } = constants;
const {
  loadPayments,
  loadPaymentsRegisterSuccess,
  loadPaymentsRegisterError,
  addPaymentRegisterSuccess,
  addPaymentRegisterError,
  deletePaymentRegisterSuccess,
  deletePaymentRegisterError,
} = actions;
const { makeSelectPaymentDefinition, makeSelectPaymentToDelete } = selectors;

const paymentAddSuccessMessage = {
  type: 'success',
  message: 'Payment started.',
};

const paymentDeleteSuccessMessage = {
  type: 'success',
  message: 'Payment deleted.',
};

export function* doLoadPayments() {
  const requestURL = apiStructure.loadPayments.fullPath;

  try {
    const paymentsResult = yield call(request, requestURL, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentsResult.error) {
      yield put(loadPaymentsRegisterError(paymentsResult));
    } else {
      yield put(loadPaymentsRegisterSuccess(paymentsResult));
    }
  } catch (err) {
    console.error(err);
    yield put(loadPaymentsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doAddPayment() {
  const paymentDefinition = JSON.parse(
    JSON.stringify(yield select(makeSelectPaymentDefinition())),
  );
  const requestURL = apiStructure.createPayment.fullPath;
  paymentDefinition.amount *= 100;

  try {
    const paymentsResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(paymentDefinition),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentsResult.error) {
      yield put(addPaymentRegisterError(paymentsResult));
      yield put(
        pushMessage({ type: 'error', message: paymentsResult.errorMessage }),
      );
    } else if (paymentsResult.warning) {
      yield put(
        pushMessage({ type: 'warn', message: paymentsResult.warningMessage }),
      );
    } else {
      yield put(addPaymentRegisterSuccess(paymentsResult));
      yield put(pushMessage(paymentAddSuccessMessage));
      window.location = `/payments/make-payment/${paymentsResult.id}`;
    }
  } catch (err) {
    yield put(addPaymentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doDeletePayment() {
  const paymentToDelete = yield select(makeSelectPaymentToDelete());
  const requestURL = apiStructure.deletePayment.fullPath;

  try {
    const paymentsResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(paymentToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentsResult.error) {
      yield put(addPaymentRegisterError(paymentsResult));
      yield put(
        pushMessage({ type: 'error', message: paymentsResult.errorMessage }),
      );
    } else if (paymentsResult.warning) {
      yield put(
        pushMessage({ type: 'warn', message: paymentsResult.warningMessage }),
      );
    } else {
      yield put(deletePaymentRegisterSuccess(paymentsResult));
      yield put(pushMessage(paymentDeleteSuccessMessage));
      yield put(loadPayments());
    }
  } catch (err) {
    yield put(deletePaymentRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_PAYMENTS, doLoadPayments);
  yield takeLatest(ADD_PAYMENT, doAddPayment);
  yield takeLatest(DELETE_PAYMENT, doDeletePayment);
}
