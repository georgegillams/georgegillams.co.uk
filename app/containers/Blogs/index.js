import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectBlogs,
  makeSelectLoading,
  makeSelectError,
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
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blogspage', reducer });
const withSaga = injectSaga({ key: 'blogspage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogsPage);
export { mapDispatchToProps };
