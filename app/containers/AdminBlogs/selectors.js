import { createSelector } from 'reselect';

const selectAdminBlogs = state => state.get('adminblogs');

const makeSelectBlogs = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('blogs'),
  );

const makeSelectBlogsLoading = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('loading'),
  );

const makeSelectBlogsLoadedSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('success'),
  );

const makeSelectBlogsLoadedError = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('error'),
  );

export {
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsLoadedSuccess,
  makeSelectBlogsLoadedError,
};
