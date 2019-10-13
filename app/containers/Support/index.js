import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import actionMeta from './actionMeta';

import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Support from './Support';
import { mapSelectors } from 'helpers/redux/selectors';
import { mapActions } from 'helpers/redux/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => mapActions(dispatch, { ...actions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...selectors }),
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
)(Support);
export { mapDispatchToProps };
