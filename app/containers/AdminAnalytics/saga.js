import { actions, constants, selectors } from './redux-definitions';

const { LOAD_ANALYTICS } = constants;
const {
  loadAnalytics,
  loadAnalyticsRegisterSuccess,
  loadAnalyticsRegisterError,
} = actions;
const { makeSelectAnalyticToDelete, makeSelectNewAnalytic } = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const loadAnalyticsSuccessMessage = {
  type: 'success',
  message: 'Analytics loaded!',
};
const analyticsLoadErrorMessage = {
  type: 'error',
  message: 'Could not load analytics.',
};

const analyticDeletedMessage = {
  type: 'success',
  message: 'Analytic deleted!',
};
const analyticDeleteErrorMessage = {
  type: 'error',
  message: 'Could not delete analytic.',
};

const analyticCreatedMessage = {
  type: 'success',
  message: 'Analytic created!',
};
const analyticCreateErrorMessage = {
  type: 'error',
  message: 'Could not create analytic.',
};

export function* doLoadAnalytics() {
  const requestURL = `${API_ENDPOINT}/analytics/load`;

  try {
    const analyticsResult = yield call(request, requestURL, {
      method: 'GET',
    });
    if (analyticsResult.error) {
      yield put(loadAnalyticsRegisterError(analyticsResult));
      yield put(pushMessage(analyticsLoadErrorMessage));
    } else {
      yield put(loadAnalyticsRegisterSuccess(analyticsResult));
      yield put(pushMessage(loadAnalyticsSuccessMessage));
    }
  } catch (err) {
    yield put(loadAnalyticsRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminAnalytics() {
  yield takeLatest(LOAD_ANALYTICS, () => doLoadAnalytics());
}
