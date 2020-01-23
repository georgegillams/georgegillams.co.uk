import { actions, constants } from './redux-definitions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser, setUserLoading } from 'containers/App/actions';
import { API_ENDPOINT } from 'helpers/constants';
import { sagaHelper } from 'helpers/redux/saga';
import request from 'utils/request';

const { REAUTHENTICATE } = constants;
const { reauthenticateRegisterSuccess, reauthenticateRegisterError } = actions;

export function* doReauthentication() {
  yield put(setUserLoading());

  const requestURL = `${API_ENDPOINT}/loadAuth`;

  const requestParams = {
    method: 'POST',
  };

  yield sagaHelper(
    requestURL,
    requestParams,
    reauthenticateRegisterError,
    reauthenticateRegisterSuccess,
    null,
    function*(loginResult) {
      yield put(setUser(loginResult));
    },
    function*() {
      yield put(setUser(null));
    },
  );
}

export default function* reauthenticate() {
  yield takeLatest(REAUTHENTICATE, () => doReauthentication());
}
