import { createSelector } from 'reselect';

const selectAdminBlogs = state => state.get('adminblogedit');

const makeSelectBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('blog'),
  );

const makeSelectBlogLoading = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('loading'),
  );

const makeSelectBlogLoadedSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('success'),
  );

const makeSelectBlogLoadedError = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('error'),
  );

const makeSelectBlogUpdating = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('updating'),
  );

const makeSelectBlogUpdatedSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('updateSuccess'),
  );

const makeSelectBlogUpdatedError = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('updateError'),
  );

const makeSelectBlogId = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('blogId'),
  );

const makeSelectNewBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('newBlog'),
  );

export {
  makeSelectBlog,
  makeSelectBlogUpdating,
  makeSelectBlogUpdatedSuccess,
  makeSelectBlogUpdatedError,
  makeSelectBlogId,
  makeSelectNewBlog,
  makeSelectBlogLoading,
  makeSelectBlogLoadedSuccess,
  makeSelectBlogLoadedError,
};
