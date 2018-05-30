import React from 'react';
import PropTypes from 'prop-types';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';
import cookie from 'react-cookies';
import Button from './Button';
import SubSection from './SubSection';
import DatabaseFunctions from '../DatabaseFunctions';
import Section from './Section';

import STYLES from './comments.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: '',
      result: null,
      cookiesAccepted: cookie.load('cookiesAccepted'),
    };
  }

  componentDidMount() {
    const reloadCookiesAccepted = () => {
      this.setState({
        cookiesAccepted: cookie.load('cookiesAccepted'),
      });
    };

    setInterval(reloadCookiesAccepted, 1000);
  }

  onCommentChanged = event => {
    this.setState({ comment: event.target.value });
  };

  onNameChanged = event => {
    this.setState({ name: event.target.value });
  };

  submitComment = () => {
    this.setState({ result: 'waiting...' });
    DatabaseFunctions.postNewComment(
      this.props.pageId,
      this.state.name,
      this.state.comment,
      result => {
        this.setState({ result });
      },
    );
  };

  render() {
    const { pageId, className, centered, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);
    const textBoxClassNameFinal = [getClassName('comments__component')];
    textBoxClassNameFinal.push(getClassName('comments__component__text-box'));

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        {this.state.cookiesAccepted ? (
          <div>
            {this.state.result ? (
              <SubSection name="Thanks for your comment 👍" />
            ) : (
              <div>
                <BpkInput
                  className={textBoxClassNameFinal.join(' ')}
                  id="commenterName"
                  name="Name"
                  value={this.state.name}
                  onChange={this.onNameChanged}
                  placeholder="You name"
                />
                <BpkTextArea
                  className={textBoxClassNameFinal.join(' ')}
                  id="comment"
                  name="Comment"
                  value={this.state.comment}
                  onChange={this.onCommentChanged}
                  placeholder="Your comment(s)"
                />
                <br />
                <Button
                  className={getClassName('comments__component')}
                  onClick={this.submitComment}
                >
                  Submit comment
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Section>
            Before you can submit comments you must agree to the privacy and
            cookies policy.
          </Section>
        )}
      </div>
    );
  }
}

CommentInput.propTypes = {
  centered: PropTypes.bool,
  pageId: PropTypes.number.isRequired,
  className: PropTypes.string,
};

CommentInput.defaultProps = {
  centered: false,
  className: null,
};

export default CommentInput;
