import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  loadEndpoints,
  createEndpoint,
  removeEndpoint,
  updateEndpoint,
  loadNotifications,
  removeNotification,
} from './actions';
import { selectState } from './selectors';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import AdminWebhooks from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  webhooksState: selectState(),
  authenticatorState: selectAuthenticatorState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadEndpoints: payload => dispatch(loadEndpoints(payload)),
    createEndpoint: payload => dispatch(createEndpoint(payload)),
    updateEndpoint: payload => dispatch(updateEndpoint(payload)),
    removeEndpoint: payload => dispatch(removeEndpoint(payload)),
    loadNotifications: payload => dispatch(loadNotifications(payload)),
    removeNotification: payload => dispatch(removeNotification(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(AdminWebhooks);
