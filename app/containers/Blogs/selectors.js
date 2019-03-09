import { createSelector } from 'reselect';

const selectBlogs = state => state.get('blogs');

const makeSelectBlogs = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('data'),
  );

const makeSelectBlogsLoading = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('loading'),
  );

const makeSelectBlogsError = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('error'),
  );

export {
  selectBlogs,
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsError,
};
