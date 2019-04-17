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

const makeSelectBlogToDelete = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('blogToDelete'),
  );

const makeSelectDeletingBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('deleting'),
  );

const makeSelectDeleteBlogSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('deleteSuccess'),
  );

const makeSelectDeleteBlogError = () =>
  createSelector(
    selectAdminBlogs,
    adminUsersState => adminUsersState.get('deleteError'),
  );

export {
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsLoadedSuccess,
  makeSelectBlogsLoadedError,
  makeSelectBlogToDelete,
  makeSelectDeletingBlog,
  makeSelectDeleteBlogSuccess,
  makeSelectDeleteBlogError,
};
