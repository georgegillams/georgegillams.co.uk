import { LOGOUT, REQUEST_VERIFICATION_EMAIL } from './constants';
import {
  logoutRegisterSuccess,
  logoutRegisterError,
  requestVerificationEmailRegisterError,
  requestVerificationEmailRegisterSuccess,
} from './actions';
import { makeSelectCredentials } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { sagaHelper } from 'helpers/redux/saga';
import request from 'utils/request';

const logoutMessage = { type: 'success', message: 'Logged out!' };
const verificationEmailMessage = {
  type: 'success',
  message: 'Verification email sent!',
};

export function* doRequestVerificationEmail() {
  const requestURL = `${API_ENDPOINT}/requestVerificationEmail`;

  const requestParams = {
    method: 'POST',
    body: '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    requestURL,
    requestParams,
    requestVerificationEmailRegisterError,
    requestVerificationEmailRegisterSuccess,
    verificationEmailMessage,
    null,
  );
}

export function* doLogout() {
  const requestURL = `${API_ENDPOINT}/logout`;

  const requestParams = {
    method: 'POST',
    body: '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield sagaHelper(
    requestURL,
    requestParams,
    logoutRegisterError,
    logoutRegisterSuccess,
    logoutMessage,
    function*() {
      yield put(setUser(null));
    },
  );
}

export default function* logout() {
  yield takeLatest(LOGOUT, () => doLogout());
  yield takeLatest(REQUEST_VERIFICATION_EMAIL, () =>
    doRequestVerificationEmail(),
  );
}
