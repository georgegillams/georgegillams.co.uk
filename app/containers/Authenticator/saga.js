import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actions, constants } from './redux-definitions';

import { setUser, setUserLoading } from 'containers/App/actions';
import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { REAUTHENTICATE } = constants;
const { reauthenticateRegisterSuccess, reauthenticateRegisterError } = actions;

export function* doReauthentication() {
  yield put(setUserLoading());

  const requestURL = apiStructure.loadAuth.fullPath;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
    });
    if (loginResult.error) {
      yield put(reauthenticateRegisterError(loginResult));
      yield put(setUser(null));
    } else {
      yield put(reauthenticateRegisterSuccess());
      yield put(setUser(loginResult));
    }
  } catch (err) {
    yield put(reauthenticateRegisterError(err));
    yield put(setUser(null));
  }
}

export default function* saga() {
  yield takeLatest(REAUTHENTICATE, doReauthentication);
}
