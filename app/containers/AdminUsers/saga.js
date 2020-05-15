import { selectors, actions, constants } from './redux-definitions';

const { LOAD_USERS, REQUEST_MAGIC_LINK_FOR_USER, DELETE_USER } = constants;
const {
  loadUsersRegisterSuccess,
  loadUsersRegisterError,
  deleteUserRegisterError,
  deleteUserRegisterSuccess,
} = actions;
const { makeSelectMagicLinkUser, makeSelectUserToDelete } = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
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
const magicLinkSuccessMessage = {
  type: 'success',
  message: 'Magic link for user sent!',
};
const magicLinkErrorMessage = {
  type: 'error',
  message: 'Could not generate magic link.',
};

const deleteUserSuccessMessage = {
  type: 'success',
  message: 'User deleted.',
};

const deleteUserErrorMessage = {
  type: 'error',
  message: 'Could not delete user.',
};

const ticketSuccessMessage = {
  type: 'success',
  message: 'Ticket for user sent!',
};
const ticketErrorMessage = {
  type: 'error',
  message: 'Could not send ticket.',
};

export function* doDeleteUser() {
  const userToDelete = yield select(makeSelectUserToDelete());
  const deleteUrl = `${API_ENDPOINT}/users/remove`;

  try {
    const deleteRequest = yield call(request, deleteUrl, {
      method: 'POST',
      body: JSON.stringify(userToDelete),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (deleteRequest.error) {
      yield put(deleteUserRegisterError(deleteRequest));
      yield put(pushMessage(deleteUserErrorMessage));
    } else {
      yield put(deleteUserRegisterSuccess(deleteRequest));
      yield put(pushMessage(deleteUserSuccessMessage));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
    yield put(deleteUserRegisterError(deleteRequest));
  }
}

export function* doRequestMagicLink() {
  const user = yield select(makeSelectMagicLinkUser());
  const magicLinkUrl = `${API_ENDPOINT}/magicLinks/load`;

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
  const usersRequestURL = `${API_ENDPOINT}/users/load`;
  const userDetailsRequestURL = `${API_ENDPOINT}/userDetails/loadAll`;

  try {
    const usersResult = yield call(request, usersRequestURL, {
      method: 'GET',
    });
    const userDetailsResult = yield call(request, userDetailsRequestURL, {
      method: 'GET',
    });
    if (usersResult.error) {
      yield put(loadUsersRegisterError(usersResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else if (userDetailsResult.error) {
      yield put(loadUsersRegisterError(userDetailsResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else {
      let associatedData = associate(
        usersResult,
        userDetailsResult,
        'id',
        'authorId',
        'userDetails',
      );
      yield put(loadUsersRegisterSuccess(associatedData));
      yield put(pushMessage(usersLoadedMessage));
    }
  } catch (err) {
    yield put(loadUsersRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_USERS, doLoadUsers);
  yield takeLatest(REQUEST_MAGIC_LINK_FOR_USER, doRequestMagicLink);
  yield takeLatest(DELETE_USER, doDeleteUser);
}
