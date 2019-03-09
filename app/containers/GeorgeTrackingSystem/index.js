import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectGtsLatest,
  makeSelectGtsLoading,
  makeSelectGtsError,
} from './selectors';
import { loadGtsLatest } from './actions';
import reducer from './reducer';
import saga from './saga';
import GeorgeTrackingSystem from './GeorgeTrackingSystem';

const mapDispatchToProps = dispatch => ({
  loadGtsLatest: () => dispatch(loadGtsLatest()),
});

const mapStateToProps = createStructuredSelector({
  gtsData: makeSelectGtsLatest(),
  loading: makeSelectGtsLoading(),
  error: makeSelectGtsError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gts', reducer });
const withSaga = injectSaga({ key: 'gts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GeorgeTrackingSystem);
export { mapDispatchToProps };
