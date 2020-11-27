import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBlogs } from 'containers/BlogList/actions';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import { selectState as selectBlogListState } from 'containers/BlogList/selectors';
import SiteMap from './Container';

import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY as BLOG_LIST_KEY } from 'containers/BlogList/constants';
import blogListSaga from 'containers/BlogList/saga';
import blogListReducer from 'containers/BlogList/reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  blogListState: selectBlogListState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadBlogs: payload => dispatch(loadBlogs(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: BLOG_LIST_KEY, saga: blogListSaga });
const withReducer = injectReducer({ key: BLOG_LIST_KEY, reducer: blogListReducer });

export default compose(withSaga, withReducer, withConnect, memo)(SiteMap);
