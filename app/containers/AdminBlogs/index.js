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
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsLoadedSuccess,
  makeSelectBlogsLoadedError,
  makeSelectDeletingBlog,
} from './selectors';
import { loadBlogs, deleteBlog } from './actions';
import reducer from './reducer';
import saga from './saga';
import AdminBlogs from './AdminBlogs';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  loadBlogs: () => dispatch(loadBlogs()),
  deleteBlog: blog => dispatch(deleteBlog(blog)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  blogs: makeSelectBlogs(),
  blogsLoading: makeSelectBlogsLoading(),
  blogsLoadedSuccess: makeSelectBlogsLoadedSuccess(),
  blogsLoadedError: makeSelectBlogsLoadedError(),
  deletingblog: makeSelectDeletingBlog(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminblogs', reducer });
const withSaga = injectSaga({ key: 'adminblogs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminBlogs);
export { mapDispatchToProps };
