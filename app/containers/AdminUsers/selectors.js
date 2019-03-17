import { createSelector } from 'reselect';

const selectAdminUsers = state => state.get('adminusers');

const makeSelectMagicLinkUser = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('magicLinkUser'),
  );

const makeSelectPaymentReceiptUser = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('paymentReceiptUser'),
  );

const makeSelectEmailTicketUser = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('emailTicketUser'),
  );

const makeSelectUsers = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('users'),
  );

const makeSelectUsersLoading = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('loading'),
  );

const makeSelectUsersLoadedSuccess = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('success'),
  );

const makeSelectUsersLoadedError = () =>
  createSelector(
    selectAdminUsers,
    adminUsersState => adminUsersState.get('error'),
  );

export {
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectUsersLoadedSuccess,
  makeSelectUsersLoadedError,
  makeSelectMagicLinkUser,
  makeSelectPaymentReceiptUser,
  makeSelectEmailTicketUser,
};
