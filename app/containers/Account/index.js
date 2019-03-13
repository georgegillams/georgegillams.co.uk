import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoggingOut,
  makeSelectLogoutSuccess,
  makeSelectLogoutError,
  makeSelectRequestVerificationEmailError,
  makeSelectRequestVerificationEmailSuccess,
  makeSelectRequestingVerificationEmail,
} from './selectors';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { logout, requestVerificationEmail } from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import Account from './Account';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  logout: () => dispatch(logout()),
  requestVerificationEmail: () => dispatch(requestVerificationEmail()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  loggingOut: makeSelectLoggingOut(),
  logoutSuccess: makeSelectLogoutSuccess(),
  logoutError: makeSelectLogoutError(),
  requestingVerificationEmail: makeSelectRequestingVerificationEmail(),
  requestVerificationEmailSuccess: makeSelectRequestVerificationEmailSuccess(),
  requestVerificationEmailError: makeSelectRequestVerificationEmailError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
export { mapDispatchToProps };
