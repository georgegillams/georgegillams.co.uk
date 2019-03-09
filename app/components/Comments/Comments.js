import React from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import Comment from './Comment';
import { LoggedInOnly } from 'components/Auth';
import { NotificationComp } from 'components/Notifications';
import { Section, SubSection } from 'components/Typography';

import './comments.scss';

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    newComment: PropTypes.object,
    user: PropTypes.object,
    newCommentBeingCreated: PropTypes.bool,
    centered: PropTypes.bool,
    updateComment: PropTypes.func.isRequired,
    onNewCommentChanged: PropTypes.func.isRequired,
    onNewCommentSubmit: PropTypes.func.isRequired,
    commentCreationError: PropTypes.string,
    pageId: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    comments: null,
    newComment: null,
    newCommentBeingCreated: false,
    centered: false,
    commentCreationError: null,
    user: null,
    className: null,
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
      onCommentSubmit,
      onCommentStartEdit,
      newCommentBeingCreated,
      createComment,
      commentCreationError,
      updateComment,
      onCommentDeleted,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    if (centered) {
      classNameFinal.push('blogs--centered');
    }

    const commentsFiltered = comments
      ? comments.filter(comment => !comment.deleted)
      : null;

    let commentsComponent = null;
    if (commentsFiltered) {
      commentsComponent =
        commentsFiltered.length === 0 ? (
          <SubSection
            noAnchor
            className="comments__component"
            name="No comments yet. Be the first!"
          />
        ) : (
          commentsFiltered.map(comment => (
            <Comment user={user} comment={comment} />
          ))
        );
    }

    return (
      <Section name="Comments" className={classNameFinal.join(' ')}>
        {commentsComponent}
      </Section>
    );
  }
}

export default Comments;
