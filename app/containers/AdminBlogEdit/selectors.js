import { createSelector } from 'reselect';

const selectAdminBlogs = state => state.get('adminblogedit');

const makeSelectBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('blog'),
  );

const makeSelectBlogLoading = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('loading'),
  );

const makeSelectBlogLoadedSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('success'),
  );

const makeSelectBlogLoadedError = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('error'),
  );

const makeSelectBlogUpdating = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('updating'),
  );

const makeSelectBlogUpdatedSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('updateSuccess'),
  );

const makeSelectBlogUpdatedError = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('updateError'),
  );

const makeSelectBlogId = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('blogId'),
  );

const makeSelectNewBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('newBlog'),
  );

const makeSelectCreateBlogId = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('id'),
  );

const makeSelectCreatingBlog = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('creating'),
  );

const makeSelectCreateBlogSuccess = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('createSuccess'),
  );

const makeSelectCreateBlogError = () =>
  createSelector(
    selectAdminBlogs,
    adminBlogsState => adminBlogsState.get('createError'),
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
  makeSelectCreateBlogId,
  makeSelectCreatingBlog,
  makeSelectCreateBlogSuccess,
  makeSelectCreateBlogError,
};
