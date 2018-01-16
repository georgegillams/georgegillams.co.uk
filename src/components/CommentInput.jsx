import React from 'react';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';
import Button from './Button';
import SubSection from './SubSection';
import RestDbIoFunctions from '../RestDbIoFunctions';

import STYLES from './comments.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
class CommentInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      result: null,
    };
  }

    onCommentChanged = (event) => {
      this.setState({ comment: event.target.value });
    }

    onNameChanged = (event) => {
      this.setState({ name: event.target.value });
    }

    submitComment = () => {
      this.setState({ result: 'waiting...' });
      RestDbIoFunctions.postNewComment(this.props.pageId, this.state.name, this.state.comment, (result) => {
        console.log(result);
        this.setState({ result });
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
          {this.state.result ? (
            <SubSection name="Thanks for your comment 👍" />
                ) : (
                  <div>
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
                )
            }
        </div>
      );
    }
}

export default CommentInput;
