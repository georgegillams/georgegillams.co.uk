import { LOAD_LINKS, ADD_LINK, DELETE_LINK } from './constants';
import {
  loadLinksSuccess,
  loadLinksError,
  addLinkSuccess,
  addLinkError,
  deleteLinkSuccess,
  deleteLinkError,
} from './actions';
import { makeSelectLinks, makeSelectLinkId } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const linkLoadSuccessMessage = {
  type: 'success',
  message: 'Links loaded.',
};

export function* doLoadLinks() {
  const requestURL = `${API_ENDPOINT}/support/load`;

  try {
    const linksResult = yield call(request, requestURL, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (linksResult.error) {
      yield put(loadLinksError(linksResult));
      yield put(pushMessage({ type: 'error', message: linksResult.error }));
    } else if (linksResult.warning) {
      yield put(pushMessage({ type: 'warn', message: linksResult.warning }));
    } else {
      yield put(loadLinksSuccess(linksResult));
      yield put(pushMessage(linkLoadSuccessMessage));
    }
  } catch (err) {
    yield put(loadLinksError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_LINKS, doLoadLinks);
  //   yield takeLatest(ADD_LINK, doAddLink);
  //   yield takeLatest(DELETE_LINK, doDeleteLink);
}
