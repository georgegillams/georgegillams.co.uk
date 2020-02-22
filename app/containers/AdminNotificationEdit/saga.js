import { selectors, constants, actions } from './redux-definitions';

const { LOAD_NOTIFICATION, UPDATE_NOTIFICATION } = constants;
const {
  loadNotificationRegisterSuccess,
  loadNotificationRegisterError,
  updateNotificationRegisterError,
  updateNotificationRegisterSuccess,
  createNotificationRegisterSuccess,
  createNotificationRegisterError,
} = actions;
const {
  makeSelectNotificationId,
  makeSelectNewNotification,
  makeSelectOnUpdateNotificationRegisterSuccess,
} = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const notificationLoadedMessage = {
  type: 'success',
  message: 'Notification loaded!',
};
const notificationLoadErrorMessage = {
  type: 'error',
  message: 'Could not load notification.',
};

const notificationUpdatedMessage = {
  type: 'success',
  message: 'Notification updated!',
};
const notificationUpdatedErrorMessage = {
  type: 'error',
  message: 'Could not save notification.',
};

export function* doLoadNotification() {
  const notificationId = yield select(makeSelectNotificationId());
  const notificationsRequestURL = `${API_ENDPOINT}/notifications/loadSingle?id=${notificationId}`;

  try {
    const notificationResult = yield call(request, notificationsRequestURL, {
      method: 'GET',
    });
    if (notificationResult.error) {
      yield put(loadNotificationRegisterError(notificationResult));
      yield put(
        pushMessage({ type: error, message: notificationResult.errorMessage }),
      );
    } else {
      yield put(loadNotificationRegisterSuccess(notificationResult));
      yield put(pushMessage(notificationLoadedMessage));
    }
  } catch (err) {
    yield put(loadNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doUpdateNotification() {
  const notification = yield select(makeSelectNewNotification());
  const onUpdateNotificationRegisterSuccess = yield select(
    makeSelectOnUpdateNotificationRegisterSuccess(),
  );
  const notificationsRequestURL = `${API_ENDPOINT}/notifications/update`;

  try {
    const updateResult = yield call(request, notificationsRequestURL, {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (updateResult.error) {
      yield put(updateNotificationRegisterError(updateResult));
      yield put(
        pushMessage({ type: error, message: updateResult.errorMessage }),
      );
    } else {
      yield put(updateNotificationRegisterSuccess(updateResult));
      if (onUpdateNotificationRegisterSuccess) {
        onUpdateNotificationRegisterSuccess();
      }
      yield put(pushMessage(notificationUpdatedMessage));
    }
  } catch (err) {
    yield put(updateNotificationRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_NOTIFICATION, doLoadNotification);
  yield takeLatest(UPDATE_NOTIFICATION, doUpdateNotification);
}
