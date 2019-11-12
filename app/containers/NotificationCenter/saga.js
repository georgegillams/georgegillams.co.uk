import { constants, actions } from './redux-definitions';

const { LOAD_NOTIFICATIONS } = constants;
const {
  loadNotificationsRegisterSuccess,
  loadNotificationsRegisterError,
} = actions;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* doLoadNotifications() {
  const requestURL = `${API_ENDPOINT}/notifications/load`;

  try {
    const notifications = yield call(request, requestURL);
    yield put(loadNotificationsRegisterSuccess(notifications));
  } catch (err) {
    yield put(loadNotificationsRegisterError(err));
  }
}

export default function* getNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, doLoadNotifications);
}
