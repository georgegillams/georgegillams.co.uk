import {
  REAUTHENTICATE,
  REAUTHENTICATE_SUCCESS,
  REAUTHENTICATE_ERROR,
  SESSION_KEY_CHANGED,
} from './constants';

export function reauthenticate() {
  return {
    type: REAUTHENTICATE,
  };
}

export function sessionKeyChanged(sessionKey) {
  return {
    type: SESSION_KEY_CHANGED,
    sessionKey,
  };
}

export function reauthenticationSuccessful() {
  return {
    type: REAUTHENTICATE_SUCCESS,
  };
}

export function reauthenticationError(error) {
  return {
    type: REAUTHENTICATE_ERROR,
    error,
  };
}
