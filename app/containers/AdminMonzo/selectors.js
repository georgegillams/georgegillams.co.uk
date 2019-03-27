import { createSelector } from 'reselect';

const selectAdminMonzo = state => state.get('adminmonzo');

const makeSelectKey = () =>
  createSelector(
    selectAdminMonzo,
    adminMonzoState => adminMonzoState.get('keyValue'),
  );

const makeSelectSetKeySuccess = () =>
  createSelector(
    selectAdminMonzo,
    adminMonzoState => adminMonzoState.get('success'),
  );

const makeSelectSetKeyError = () =>
  createSelector(
    selectAdminMonzo,
    adminMonzoState => adminMonzoState.get('error'),
  );

export {
  selectAdminMonzo,
  makeSelectKey,
  makeSelectSetKeySuccess,
  makeSelectSetKeyError,
};
