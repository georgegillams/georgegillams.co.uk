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
  makeSelectBlog,
  makeSelectBlogLoading,
  makeSelectBlogLoadedSuccess,
  makeSelectBlogLoadedError,
  makeSelectBlogUpdating,
  makeSelectBlogUpdatedSuccess,
  makeSelectBlogUpdatedError,
} from './selectors';
import { loadBlog, updateBlog } from './actions';
import reducer from './reducer';
import saga from './saga';
import AdminBlogEdit from './AdminBlogEdit';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  loadBlog: id => dispatch(loadBlog(id)),
  updateBlog: newValue => dispatch(updateBlog(newValue)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  blog: makeSelectBlog(),
  blogLoading: makeSelectBlogLoading(),
  blogLoadedSuccess: makeSelectBlogLoadedSuccess(),
  blogLoadedError: makeSelectBlogLoadedError(),
  blogUpdating: makeSelectBlogUpdating(),
  blogUpdatedSuccess: makeSelectBlogUpdatedSuccess(),
  blogUpdatedError: makeSelectBlogUpdatedError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminblogedit', reducer });
const withSaga = injectSaga({ key: 'adminblogedit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminBlogEdit);
export { mapDispatchToProps };
