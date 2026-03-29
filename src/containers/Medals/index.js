import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadMedals, updateMedal, deleteMedal, createMedal } from './actions';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import { selectState } from './selectors';
import Medals from './Container';

import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  medalsState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadMedals: payload => dispatch(loadMedals(payload)),
    createMedal: payload => dispatch(createMedal(payload)),
    updateMedal: payload => dispatch(updateMedal(payload)),
    deleteMedal: payload => dispatch(deleteMedal(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(Medals);
