import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks, createLink, deleteLink } from './actions';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import { selectState } from './selectors';
import Support from './Container';

import injectSaga from 'utils/common/redux/inject-saga';
import injectReducer from 'utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  supportState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadLinks: payload => dispatch(loadLinks(payload)),
    createLink: payload => dispatch(createLink(payload)),
    deleteLink: payload => dispatch(deleteLink(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(Support);
