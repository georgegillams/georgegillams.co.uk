import { constants, selectors, actions } from './redux-definitions';

const { VERIFY_EMAIL } = constants;
const { verifyEmailRegisterSuccess, verifyEmailRegisterError } = actions;
const { makeSelectToken } = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { sagaHelper } from 'helpers/redux/saga';
import request from 'utils/request';

const emailVerifiedMessage = { type: 'success', message: 'Email verified!' };

export function* doVerification() {
  const token = yield select(makeSelectToken());
  const requestURL = `${API_ENDPOINT}/verifyemail`;

  const requestParams = {
    method: 'POST',
    body: JSON.stringify({ verificationKey: token }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield sagaHelper(
    requestURL,
    requestParams,
    verifyEmailRegisterError,
    verifyEmailRegisterSuccess,
    emailVerifiedMessage,
    null,
  );
}

export default function* saga() {
  yield takeLatest(VERIFY_EMAIL, doVerification);
}
