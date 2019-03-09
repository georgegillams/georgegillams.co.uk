import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectBlog,
  makeSelectBlogLoading,
  makeSelectBlogError,
} from './selectors';
import { loadBlog, blogIdChanged } from './actions';
import reducer from './reducer';
import saga from './saga';
import BlogViewer from './BlogViewer';

const mapDispatchToProps = dispatch => ({
  loadBlog: () => dispatch(loadBlog()),
  setBlogId: newValue => dispatch(blogIdChanged(newValue)),
});

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectBlogLoading(),
  error: makeSelectBlogError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blog', reducer });
const withSaga = injectSaga({ key: 'blog', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogViewer);
export { mapDispatchToProps };
