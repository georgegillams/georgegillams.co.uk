import { call, put } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';

export function* sagaHelper(
  requestURL,
  requestParams,
  registerErrorAction,
  registerSuccessAction,
  successMessage,
  postSuccessCallback = null,
  postFailureCallback = null,
) {
  try {
    const result = yield call(request, requestURL, requestParams);
    if (result.error) {
      yield put(registerErrorAction(result));
      yield put(pushMessage({ type: 'error', message: result.errorMessage }));
      if (postFailureCallback) {
        yield postFailureCallback(result);
      }
    } else {
      if (result.warning) {
        yield put(
          pushMessage({ type: 'warn', message: result.warningMessage }),
        );
      }
      if (successMessage) {
        yield put(pushMessage(successMessage));
      }
      yield put(registerSuccessAction(result));
      if (postSuccessCallback) {
        yield postSuccessCallback(result);
      }
    }
  } catch (err) {
    yield put(registerErrorAction(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
    if (postFailureCallback) {
      yield postFailureCallback(err);
    }
  }
}
