import React from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CannotComment from './CannotComment';
import Comment from './Comment';
import { Section, SubSection } from '../index';
import { cssModules } from 'bpk-react-utils';

import STYLES from './comments.scss';

const getClassName = cssModules(STYLES);

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    newComment: PropTypes.object,
    user: PropTypes.object,
    newCommentBeingCreated: PropTypes.bool,
    centered: PropTypes.bool,
    onCommentChanged: PropTypes.func.isRequired,
    onNewCommentChanged: PropTypes.func.isRequired,
    onNewCommentSubmit: PropTypes.func.isRequired,
    commentCreationError: PropTypes.string,
    pageId: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    comments: null,
    newComment: null,
    newCommentBeingCreated: false,
    centered: false,
    commentCreationError: null,
    user: null,
    className: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      comments,
      centered,
      pageId,
      className,
      newComment,
      onNewCommentChanged,
      onNewCommentSubmit,
      onCommentSubmit,
      onCommentStartEdit,
      newCommentBeingCreated,
      commentCreationError,
      onCommentChanged,
      onCommentDeleted,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    if (centered) {
      classNameFinal.push(getClassName('blogs--centered'));
    }

    let commentsComponent = null;
    if (comments) {
      commentsComponent =
        comments.length === 0 ? (
          <SubSection
            noAnchor
            className={getClassName('comments__component')}
            name="No comments yet. Be the first!"
          />
        ) : (
          comments.map(
            comment =>
              comment.editing ? (
                <CommentInput
                  comment={{ ...comment, comment: comment.newValue }}
                  onCommentChanged={onCommentChanged}
                  submitButtonText="Update comment"
                  onSubmit={() => {
                    onCommentSubmit(comment);
                  }}
                  centered={centered}
                />
              ) : (
                <Comment
                  user={user}
                  comment={comment}
                  onCommentDeleted={onCommentDeleted}
                  onCommentStartEdit={() => {
                    onCommentStartEdit(comment);
                  }}
                />
              )
          )
        );
    }

    return (
      <Section name="Comments" className={classNameFinal.join(' ')}>
        {commentsComponent}
        {!user && <CannotComment />}
        {commentCreationError && <div>Comment creation error</div>}
        {user && (
          <CommentInput
            newCommentBeingCreated={newCommentBeingCreated}
            comment={newComment}
            onCommentChanged={onNewCommentChanged}
            onSubmit={onNewCommentSubmit}
            submitButtonText="Submit comment"
            centered={centered}
          />
        )}
      </Section>
    );
  }
}

export default Comments;