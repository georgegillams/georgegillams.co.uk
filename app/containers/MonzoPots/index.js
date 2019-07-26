import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import MonzoPots from './MonzoPots';
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

const withReducer = injectReducer({ key: 'monzo', reducer });
const withSaga = injectSaga({ key: 'monzo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MonzoPots);
export { mapDispatchToProps };
