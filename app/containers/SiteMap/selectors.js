import { createSelector } from 'reselect';

const selectSiteMap = state => state.get('site-map');

const makeSelectBlogs = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('data'),
  );

const makeSelectBlogsLoading = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('loading'),
  );

const makeSelectBlogsError = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('error'),
  );

export {
  selectSiteMap,
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsError,
};
