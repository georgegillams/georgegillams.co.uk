import { selectors, constants, actions } from './redux-definitions';

const { LOAD_USERTOEDIT, UPDATE_USERTOEDIT } = constants;
const {
  updateUsertoeditRegisterError,
  updateUsertoeditRegisterSuccess,
} = actions;
const {
  makeSelectNewUsertoedit,
  makeSelectOnUpdateUsertoeditRegisterSuccess,
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

const usertoeditUpdatedMessage = {
  type: 'success',
  message: 'User updated!',
};
const usertoeditUpdatedErrorMessage = {
  type: 'error',
  message: 'Could not save user.',
};

export function* doUpdateUsertoedit() {
  const usertoedit = yield select(makeSelectNewUsertoedit());
  const onUpdateUsertoeditRegisterSuccess = yield select(
    makeSelectOnUpdateUsertoeditRegisterSuccess(),
  );
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
      if (onUpdateUsertoeditRegisterSuccess) {
        onUpdateUsertoeditRegisterSuccess();
      }
      yield put(pushMessage(usertoeditUpdatedMessage));
    }
  } catch (err) {
    yield put(updateUsertoeditRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(UPDATE_USERTOEDIT, doUpdateUsertoedit);
}
