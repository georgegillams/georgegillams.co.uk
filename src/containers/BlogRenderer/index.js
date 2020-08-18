import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBlog, updateBlog } from './actions';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import { selectState } from './selectors';
import BlogRenderer from './Container';

import injectSaga from 'utils/common/redux/inject-saga';
import injectReducer from 'utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  blogRenderState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadBlog: payload => dispatch(loadBlog(payload)),
    updateBlog: payload => dispatch(updateBlog(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(BlogRenderer);
