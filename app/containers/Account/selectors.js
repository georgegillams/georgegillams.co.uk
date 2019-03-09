import { createSelector } from 'reselect';

const selectLogout = state => state.get('account');

const makeSelectLoggingOut = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('loggingOut'),
  );

const makeSelectLogoutSuccess = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('success'),
  );

const makeSelectLogoutError = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('error'),
  );

const makeSelectRequestingVerificationEmail = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('requestingVerificationEmail'),
  );

const makeSelectRequestVerificationEmailSuccess = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('requestingSuccess'),
  );

const makeSelectRequestVerificationEmailError = () =>
  createSelector(
    selectLogout,
    logoutState => logoutState.get('requestingError'),
  );

export {
  selectLogout,
  makeSelectLoggingOut,
  makeSelectLogoutSuccess,
  makeSelectLogoutError,
  makeSelectRequestingVerificationEmail,
  makeSelectRequestVerificationEmailSuccess,
  makeSelectRequestVerificationEmailError,
};
