import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, actions } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { LOAD_NOTIFICATIONS } = constants;
const {
  loadNotificationsRegisterSuccess,
  loadNotificationsRegisterError,
} = actions;

export function* doLoadNotifications() {
  const requestURL = apiStructure.loadNotifications.fullPath;

  try {
    const notifications = yield call(request, requestURL);
    if (notifications.error) {
      yield put(pushMessage(setKeyErrorMessage));
      yield put(addKeyRegisterError(setKeyResult));
    } else {
      yield put(pushMessage(setKeySuccessMessage));
      yield put(addKeyRegisterSuccess(setKeyResult));
    }
    yield put(loadNotificationsRegisterSuccess(notifications));
  } catch (err) {
    yield put(loadNotificationsRegisterError(err));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_NOTIFICATIONS, doLoadNotifications);
}
