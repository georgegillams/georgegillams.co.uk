import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectBlogs,
  makeSelectBlogsLoading,
  makeSelectBlogsError,
} from './selectors';
import { loadBlogs } from './actions';
import reducer from './reducer';
import saga from './saga';
import BlogsPage from './BlogsPage';

const mapDispatchToProps = dispatch => ({
  loadBlogs: () => dispatch(loadBlogs()),
});

const mapStateToProps = createStructuredSelector({
  blogs: makeSelectBlogs(),
  loading: makeSelectBlogsLoading(),
  error: makeSelectBlogsError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blogs', reducer });
const withSaga = injectSaga({ key: 'blogs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogsPage);
export { mapDispatchToProps };
