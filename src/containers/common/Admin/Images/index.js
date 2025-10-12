import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadImages, removeImage, createImage, downloadImagesZip } from './actions';
import { selectState } from './selectors';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import AdminImages from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  adminImagesState: selectState(),
  authenticatorState: selectAuthenticatorState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    load: payload => dispatch(loadImages(payload)),
    remove: payload => dispatch(removeImage(payload)),
    create: payload => dispatch(createImage(payload)),
    downloadZip: payload => dispatch(downloadImagesZip(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(AdminImages);
