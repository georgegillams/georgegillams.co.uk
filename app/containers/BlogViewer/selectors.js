import { createSelector } from 'reselect';

const selectBlog = state => state.get('blog');

const makeSelectBlog = () =>
  createSelector(
    selectBlog,
    blogState => blogState.get('data'),
  );

const makeSelectBlogId = () =>
  createSelector(
    selectBlog,
    blogState => blogState.get('blogId'),
  );

const makeSelectBlogLoading = () =>
  createSelector(
    selectBlog,
    blogState => blogState.get('loading'),
  );

const makeSelectBlogError = () =>
  createSelector(
    selectBlog,
    blogState => blogState.get('error'),
  );

export {
  selectBlog,
  makeSelectBlogId,
  makeSelectBlog,
  makeSelectBlogLoading,
  makeSelectBlogError,
};
