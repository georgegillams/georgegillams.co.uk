import { SET_KEY, SET_KEY_SUCCESS, SET_KEY_ERROR } from './constants';

export function setKey(key) {
  return {
    type: SET_KEY,
    keyValue: key,
  };
}

export function setKeySuccess() {
  return {
    type: SET_KEY_SUCCESS,
  };
}

export function setKeyError(error) {
  return {
    type: SET_KEY_ERROR,
    error,
  };
}
