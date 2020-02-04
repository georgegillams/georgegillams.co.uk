import { selectors, constants, actions } from './redux-definitions';

const { LOAD_USERTOEDIT, UPDATE_USERTOEDIT } = constants;
const {
  loadUsertoeditRegisterSuccess,
  loadUsertoeditRegisterError,
  updateUsertoeditRegisterError,
  updateUsertoeditRegisterSuccess,
  createUsertoeditRegisterSuccess,
  createUsertoeditRegisterError,
} = actions;
const {
  makeSelectUsertoeditId,
  makeSelectNewUsertoedit,
  makeSelectOnChangeComplete,
} = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const usertoeditCreatedMessage = {
  type: 'success',
  message: 'User created!',
};
const usertoeditCreateErrorMessage = {
  type: 'error',
  message: 'Could not create user.',
};
const usertoeditLoadedMessage = {
  type: 'success',
  message: 'User loaded!',
};
const usertoeditLoadErrorMessage = {
  type: 'error',
  message: 'Could not load user.',
};

const usertoeditUpdatedMessage = {
  type: 'success',
  message: 'User updated!',
};
const usertoeditUpdatedErrorMessage = {
  type: 'error',
  message: 'Could not save user.',
};

export function* doLoadUsertoedit() {
  const usertoeditId = yield select(makeSelectUsertoeditId());
  const usertoeditsRequestURL = `${API_ENDPOINT}/users/loadSingle?id=${usertoeditId}`;

  try {
    const usertoeditResult = yield call(request, usertoeditsRequestURL, {
      method: 'GET',
    });
    if (usertoeditResult.error) {
      yield put(loadUsertoeditRegisterError(usertoeditResult));
      yield put(
        pushMessage({ type: error, message: usertoeditResult.errorMessage }),
      );
    } else {
      yield put(loadUsertoeditRegisterSuccess(usertoeditResult));
      yield put(pushMessage(usertoeditLoadedMessage));
    }
  } catch (err) {
    yield put(loadUsertoeditRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateUsertoedit() {
  const usertoedit = yield select(makeSelectNewUsertoedit());
  const onChangeComplete = yield select(makeSelectOnChangeComplete());
  console.log(`onChangeComplete`, onChangeComplete);
  const usertoeditsRequestURL = `${API_ENDPOINT}/users/update`;

  try {
    const updateResult = yield call(request, usertoeditsRequestURL, {
      method: 'POST',
      body: JSON.stringify(usertoedit),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateUsertoeditRegisterError(updateResult));
      yield put(
        pushMessage({ type: error, message: updateResult.errorMessage }),
      );
    } else {
      yield put(updateUsertoeditRegisterSuccess(updateResult));
      if (onChangeComplete) {
        onChangeComplete();
      }
      yield put(pushMessage(usertoeditUpdatedMessage));
    }
  } catch (err) {
    yield put(updateUsertoeditRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_USERTOEDIT, () => doLoadUsertoedit());
  yield takeLatest(UPDATE_USERTOEDIT, () => doUpdateUsertoedit());
}
