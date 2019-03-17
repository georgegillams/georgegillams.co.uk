import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectUsersLoadedSuccess,
  makeSelectUsersLoadedError,
} from './selectors';
import { setCookiesAllowed } from 'containers/App/actions';
import {
  loadUsers,
  requestMagicLinkForUser,
  resendPaymentReceipt,
  sendTicketEmail,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import AdminUsers from './AdminUsers';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  sendTicketEmail: user => dispatch(sendTicketEmail(user)),
  requestMagicLinkForUser: user => dispatch(requestMagicLinkForUser(user)),
  resendPaymentReceipt: user => dispatch(resendPaymentReceipt(user)),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
  loadUsers: () => dispatch(loadUsers()),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  users: makeSelectUsers(),
  usersLoading: makeSelectUsersLoading(),
  usersLoadedSuccess: makeSelectUsersLoadedSuccess(),
  usersLoadedError: makeSelectUsersLoadedError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminusers', reducer });
const withSaga = injectSaga({ key: 'adminusers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminUsers);
export { mapDispatchToProps };
