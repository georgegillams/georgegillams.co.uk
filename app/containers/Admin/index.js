import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUser,
  makeSelectError as makeSelectUserLoadError,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import Admin from './Admin';

const mapDispatchToProps = dispatch => ({
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  userLoadError: makeSelectUserLoadError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
export { mapDispatchToProps };
