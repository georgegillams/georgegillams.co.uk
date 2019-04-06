import React from 'react';
import PropTypes from 'prop-types';
import GGButton from 'components/GGButton';
import { BlogPreviewContent, SubSection } from 'components/Typography';
import CommentInput from './CommentInput';

import STYLES from './comments.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

class Comment extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    comment: PropTypes.object,
    updateComment: PropTypes.func.isRequired,
    updatingComment: PropTypes.bool,
    updateCommentError: PropTypes.bool,
    updateCommentSuccess: PropTypes.bool,
  };

  static defaultProps = {
    user: null,
    comment: null,
    updatingComment: false,
    updateCommentError: false,
    updateCommentSuccess: false,
  };

  constructor(props) {
    super(props);

    this.state = { editing: false };
  }

  componentWillReceiveProps = newProps => {
    if (
      this.props.updatingComment &&
      !newProps.updatingComment &&
      !newProps.updateCommentError
    ) {
      this.setState({ editing: false });
    }
  };

  render() {
    const {
      user,
      className,
      centered,
      comment,
      updateComment,
      updatingComment,
      updateCommentError,
      updateCommentSuccess,
      deleteComment,
      deletingComment,
      deleteCommentSuccess,
      deleteCommentError,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    const textBoxClassNameFinal = [getClassName('comments__component')];
    textBoxClassNameFinal.push(getClassName('comments__component__text-box'));

    const canEdit = user && (user.id === comment.authorId || user.admin);
    const contentFinal = `${comment.comment}${
      comment.deleted ? ' (DELETED)' : ''
    }`;
    if (!contentFinal || contentFinal === '') {
      return null;
    }

    const supportedFeatures = [
      'code',
      'blockCode',
      'bold',
      'italic',
      'strikethrough',
      'quotation',
      'link',
    ];

    let displayName = 'Anon';
    if (comment.ownerUname && comment.ownerUname !== 'Anon') {
      displayName = comment.ownerUname;
    } else if (comment.displayName) {
      displayName = comment.displayName;
    } else if (comment.authorId) {
      displayName = `User ${comment.authorId}`;
    }

    return (
      <SubSection
        noAnchor
        className={getClassName("comments__component")}
        name={`${displayName}`}
      >
        {!this.state.editing && (
          <BlogPreviewContent
            supportedFeatures={supportedFeatures}
            content={contentFinal}
          />
        )}
        {this.state.editing && (
          <CommentInput
            comment={comment}
            user={user}
            centered={centered}
            submitLabel="Update comment"
            onSubmit={updateComment}
            updatingComment={updatingComment}
            updateCommentError={updateCommentError}
            updateCommentSuccess={updateCommentSuccess}
          />
        )}
        {canEdit && !this.state.editing && (
          <div>
            <GGButton onClick={() => this.setState({ editing: true })}>
              Edit
            </GGButton>
            {!comment.deleted && (
              <GGButton
                disabled={deletingComment}
                onClick={() => {
                  deleteComment(comment);
                }}
                destructive
              >
                Delete
              </GGButton>
            )}
          </div>
        )}
      </SubSection>
    );
  }
}

Comment.propTypes = {
  centered: PropTypes.bool,
  pageId: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Comment.defaultProps = {
  centered: false,
  className: null,
};

export default Comment;
