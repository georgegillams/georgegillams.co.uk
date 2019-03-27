import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUser,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectKey,
  makeSelectSetKeySuccess,
  makeSelectSetKeyError,
} from './selectors';
import { setKey } from './actions';
import reducer from './reducer';
import saga from './saga';
import AdminMonzo from './AdminMonzo';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  setKey: key => dispatch(setKey(key)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  keyValue: makeSelectKey(),
  setKeySuccess: makeSelectSetKeySuccess(),
  setKeyError: makeSelectSetKeyError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminmonzo', reducer });
const withSaga = injectSaga({ key: 'adminmonzo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminMonzo);
export { mapDispatchToProps };
