import React from 'react';
import PropTypes from 'prop-types';
import { DebugObject, LoadingCover } from 'components/Auth';
import Comments, { CommentInput } from 'components/Comments';
import CommentsListSkeleton from './CommentsListSkeleton';
import 'containers/pages.scss';

const getClassName = c => c;

export default class CommentsContainer extends React.Component {
  componentWillMount = () => {
    this.props.loadComments(this.props.pageId);
  };

  render() {
    const {
      pageId,
      comment,
      className,
      user,

      loadComments,
      loading,
      error,
      comments,

      createComment,
      creatingComment,
      createCommentSuccess,
      createCommentError,
      ...rest
    } = this.props;

    const outerClassNameFinal = [];
    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <DebugObject
          debugTitle="Comments"
          debugObject={{
            pageId,
            comment,
            className,
            user,
            loadComments,
            loading,
            error,
            comments,
            createComment,
            creatingComment,
            createCommentSuccess,
            createCommentError,
          }}
        />
        <LoadingCover
          loadingSkeleton={CommentsListSkeleton}
          loading={loading}
          error={error}
        >
          {comments && (
            <Comments
              comments={comments}
              user={user}
              centered={false}
              pageId={pageId}
            />
          )}
          {comments && (
            <CommentInput
              user={user}
              centered={false}
              pageId={pageId}
              submitLabel="Add comment"
              onSubmit={createComment}
              creatingComment={creatingComment}
              createCommentError={createCommentError}
              createCommentSuccess={createCommentSuccess}
            />
          )}
        </LoadingCover>
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadComments: PropTypes.func.isRequired,
  className: PropTypes.string,
};
