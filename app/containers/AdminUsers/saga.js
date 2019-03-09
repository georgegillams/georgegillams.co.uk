import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  LOAD_USERS,
  REQUEST_MAGIC_LINK_FOR_USER,
} from './constants';
import { loadUsersSuccess, loadUsersError } from './actions';
import {
  makeSelectMagicLinkUser,
  makeSelectPaymentReceiptUser,
} from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { calculateOutstandingBalance } from 'helpers/ticketing';
import { associate } from 'helpers/objects';

import request from 'utils/request';

const usersLoadedMessage = { type: 'success', message: 'Users loaded!' };
const usersLoadedErrorMessage = {
  type: 'error',
  message: 'Could not load users.',
};
export function* doRequestMagicLink() {
  const user = yield select(makeSelectMagicLinkUser());
  const magicLinkUrl = `${API_ENDPOINT}/getmagiclink`;

  try {
    const magicLinkResult = yield call(request, magicLinkUrl, {
      method: 'POST',
      body: JSON.stringify({ email: user.email, divertToAdmin: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (magicLinkResult.error) {
      yield put(pushMessage(magicLinkErrorMessage));
    } else {
      yield put(pushMessage(magicLinkSuccessMessage));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadUsers() {
  const requestURL = `${API_ENDPOINT}/users/load`;

  try {
    const usersResult = yield call(request, requestURL, {
      method: 'GET',
    }); // Can add third arg for options
    if (usersResult.error) {
      yield put(loadUsersError(usersResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else {
      yield put(loadUsersSuccess(usersResult));
      yield put(pushMessage(usersLoadedMessage));
    }
  } catch (err) {
    yield put(loadUsersError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_USERS, () => doLoadUsers());
  yield takeLatest(REQUEST_MAGIC_LINK_FOR_USER, () => doRequestMagicLink());
}
