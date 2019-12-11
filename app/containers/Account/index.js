import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import actionMeta from './actionMeta';
import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Container from './Container';

import injectReducer from 'meta-redux/dist/utils/injectReducer';
import injectSaga from 'meta-redux/dist/utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';
import { mapSelectors } from 'meta-redux/dist/selectors';
import { mapActions } from 'meta-redux/dist/actions';

const mapDispatchToProps = dispatch =>
  mapActions(dispatch, { ...appActions, ...actions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...appSelectors, ...selectors }),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: actionMeta.key, reducer });
const withSaga = injectSaga({ key: actionMeta.key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Container);
export { mapDispatchToProps };
