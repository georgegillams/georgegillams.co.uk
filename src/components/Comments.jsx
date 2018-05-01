import React from 'react';
import PropTypes from 'prop-types';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import Section from './Section';
import SubSection from './SubSection';
import CommentInput from './CommentInput';
import DatabaseFunctions from '../DatabaseFunctions';

import STYLES from './comments.scss';
import BLOG_STYLES from './blogs.scss';

const getClassName = className =>
  STYLES[className] || BLOG_STYLES[className] || 'UNKNOWN';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { comments: null };
  }

  componentDidMount() {
    const getComments = () => {
      DatabaseFunctions.getComments(this.props.pageId, results => {
        this.setState({ comments: results });
      });
    };

    getComments();
    setInterval(getComments, 5000);
  }

  render() {
    const { centered, pageId, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    if (centered) {
      classNameFinal.push(getClassName('blogs--centered'));
    }

    let comments = null;
    if (this.state.comments) {
      comments =
        this.state.comments.length === 0 ? (
          <SubSection
            noAnchor
            className={getClassName('comments__component')}
            name="No comments yet. Be the first!"
          />
        ) : (
          this.state.comments.map(c => (
            <SubSection
              noAnchor
              className={getClassName('comments__component')}
              name={`${c.commenterName}`}
            >
              {c.comment}
            </SubSection>
          ))
        );
    }

    const commentsLoading = (
      <SubSection
        noAnchor
        className={getClassName('comments__component')}
        name="Loading comments for blog..."
        {...rest}
      >
        <BpkSpinner type={SPINNER_TYPES.dark} />
      </SubSection>
    );

    return (
      <Section name="Comments" className={classNameFinal.join(' ')}>
        {this.state.comments ? comments : commentsLoading}
        <CommentInput centered={centered} pageId={pageId} />
      </Section>
    );
  }
}

Comments.propTypes = {
  centered: PropTypes.bool,
  pageId: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Comments.defaultProps = {
  centered: false,
  className: null,
};

export default Comments;
