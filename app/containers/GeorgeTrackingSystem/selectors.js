import { createSelector } from 'reselect';

const selectGts = state => state.get('gts');

const makeSelectGtsLatest = () =>
  createSelector(
    selectGts,
    gtsState => gtsState.get('dataLatest'),
  );

const makeSelectGtsLoading = () =>
  createSelector(
    selectGts,
    gtsState => gtsState.get('loading'),
  );

const makeSelectGtsError = () =>
  createSelector(
    selectGts,
    gtsState => gtsState.get('error'),
  );

export {
  selectGts,
  makeSelectGtsLatest,
  makeSelectGtsLoading,
  makeSelectGtsError,
};
