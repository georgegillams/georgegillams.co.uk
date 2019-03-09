import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectComment,
  makeSelectComments,
  makeSelectCommentsLoading,
  makeSelectCommentsLoadError,
  makeSelectCreatingComment,
  makeSelectCreateCommentError,
  makeSelectCreateCommentSuccess,
} from './selectors';
import { makeSelectUser } from 'containers/App/selectors';
import { updateComment, loadComments, createComment } from './actions';
import reducer from './reducer';
import saga from './saga';
import Comments from './Comments';

const mapDispatchToProps = dispatch => ({
  loadComments: pageId => dispatch(loadComments(pageId)),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),

  loading: makeSelectCommentsLoading(),
  error: makeSelectCommentsLoadError(),
  comments: makeSelectComments(),

  comment: makeSelectComment(),
  creatingComment: makeSelectCreatingComment(),
  createCommentSuccess: makeSelectCreateCommentSuccess(),
  createCommentError: makeSelectCreateCommentError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'comments', reducer });
const withSaga = injectSaga({ key: 'comments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Comments);
export { mapDispatchToProps };
