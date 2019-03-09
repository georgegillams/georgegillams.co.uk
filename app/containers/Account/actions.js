import {
  REQUEST_VERIFICATION_EMAIL,
  REQUEST_VERIFICATION_EMAIL_ERROR,
  REQUEST_VERIFICATION_EMAIL_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';

export function requestVerificationEmail() {
  return {
    type: REQUEST_VERIFICATION_EMAIL,
  };
}

export function requestVerificationEmailSuccess() {
  return {
    type: REQUEST_VERIFICATION_EMAIL_SUCCESS,
  };
}

export function requestVerificationEmailError(error) {
  return {
    type: REQUEST_VERIFICATION_EMAIL_ERROR,
    error,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccessful() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}
