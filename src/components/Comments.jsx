import React from 'react';
import PropTypes from 'prop-types';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import cookie from 'react-cookies';
import Section from './Section';
import SubSection from './SubSection';
import CommentInput from './CommentInput';
import Button from './Button';
import BlogPreviewContent from './BlogPreviewContent';
import DatabaseFunctions from '../DatabaseFunctions';
import HelperFunctions from '../HelperFunctions';

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

    const reloadCookies = () => {
      this.setState({
        sessionId: cookie.load('sessionId'),
        loggedInAdmin: cookie.load('loggedInAdmin'),
        userComments: cookie.load('userComments') || [],
      });
    };

    getComments();
    reloadCookies();
    setInterval(reloadCookies, 1000);
    setInterval(getComments, 1000);
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
              <BlogPreviewContent supportedFeatures={['code','blockCode', 'bold', 'italic', 'strikethrough', 'quotation', 'link']} content={c.comment} />
              <br />
              {(HelperFunctions.includes(
                this.state.userComments,
                c.commentId,
              ) ||
                this.state.loggedInAdmin) && (
                <Button
                  className={getClassName('comments__component__button')}
                  destructive
                  onClick={() => {
                    DatabaseFunctions.deleteComment(
                      this.state.sessionId,
                      pageId,
                      null,
                      c.commentId,
                      result => null,
                    );
                  }}
                >
                  {this.state.loggedInAdmin
                    ? 'Delete commet'
                    : 'Delete my comment'}
                </Button>
              )}
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
