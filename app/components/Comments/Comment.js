import React from 'react';
import PropTypes from 'prop-types';
import GGButton from 'components/GGButton';
import { BlogPreviewContent, SubSection } from 'components/Typography';

import './comments.scss';

class Comment extends React.Component {
  static propTypes = {
    onCommentStartEdit: PropTypes.func.isRequired,
    onCommentDeleted: PropTypes.func.isRequired,
    user: PropTypes.object,
    comment: PropTypes.object,
  };

  static defaultProps = {
    user: null,
    comment: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCommentStartEdit,
      user,
      className,
      centered,
      comment,
      onCommentDeleted,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    const textBoxClassNameFinal = ['comments__component'];
    textBoxClassNameFinal.push('comments__component__text-box');

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
        className="comments__component"
        name={`${displayName}`}
      >
        <BlogPreviewContent
          supportedFeatures={supportedFeatures}
          content={contentFinal}
        />
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
