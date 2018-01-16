import React from 'react';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';
import Button from './Button';
import Section from './Section';
import RestDbIoFunctions from '../RestDbIoFunctions';

import STYLES from './comments.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
class CommentInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' };
  }

    onCommentChanged = (event) => {
      this.setState({ comment: event.target.value });
    }

    onNameChanged = (event) => {
      this.setState({ name: event.target.value });
    }

    submitComment = () => {
      RestDbIoFunctions.postNewComment(this.props.pageId, this.state.name, this.state.comment, (result) => {
        console.log(result);
      });
    }

    render() {
      const {
        pageId, className, ...rest
      } = this.props;

      const classNameFinal = [];
      if (className) classNameFinal.push(className);

      return (
        <div className={classNameFinal.join(' ')}>
          <BpkInput
            className={getClassName('comments__component')}
            id="commenterName"
            name="Name"
            value={this.state.name}
            onChange={this.onNameChanged}
            placeholder="You name"
          />
          <BpkTextArea
            className={getClassName('comments__component')}
            id="comment"
            name="Comment"
            values={this.state.comment}
            onChange={this.onCommentChanged}
            placeholder="Your comment(s)"
          />
          <Button
            className={getClassName('comments__component')}
            onClick={this.submitComment}
          >Submit comment
          </Button>
        </div>
      );
    }
}

export default CommentInput;
