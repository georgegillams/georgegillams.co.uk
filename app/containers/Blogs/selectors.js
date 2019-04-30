import { createSelector } from 'reselect';

const selectBlogs = state => state.get('blogspage');

const makeSelectBlogs = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('blogs'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectBlogs,
    blogsState => blogsState.get('error'),
  );

export { selectBlogs, makeSelectBlogs, makeSelectLoading, makeSelectError };
