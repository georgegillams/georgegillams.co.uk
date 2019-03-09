import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RELOAD_COMMENTS, LOAD_COMMENTS, CREATE_COMMENT } from './constants';
import {
  reloadComments,
  commentsLoaded,
  commentsLoadingError,
  commentCreateSuccess,
  commentCreateError,
} from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { makeSelectComment, makeSelectPageId } from './selectors';
import { COMMUNICATION_ERROR_MESSAGE, API_ENDPOINT } from 'helpers/constants';

import request from 'utils/request';

export function* loadComments() {
  const pageId = yield select(makeSelectPageId());
  const requestURL = `${API_ENDPOINT}/comments/load?pageId=${pageId}`;

  try {
    const comments = yield call(request, requestURL);
    yield put(commentsLoaded(comments));
  } catch (err) {
    yield put(commentsLoadingError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* createComment() {
  const comment = yield select(makeSelectComment());
  const pageId = yield select(makeSelectPageId());
  comment.pageId = pageId;
  const requestURL = `${API_ENDPOINT}/comments/create`;

  try {
    const commentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(commentCreateSuccess(commentResult));
    yield put(reloadComments(pageId));
  } catch (err) {
    yield put(commentCreateError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_COMMENTS, loadComments);
  yield takeLatest(RELOAD_COMMENTS, loadComments);
  yield takeLatest(CREATE_COMMENT, createComment);
}
