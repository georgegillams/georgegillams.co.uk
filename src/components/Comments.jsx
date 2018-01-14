import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import Section from './Section';
import SubSection from './SubSection';
import CommentInput from './CommentInput';
import RestDbIoFunctions from '../RestDbIoFunctions';

import STYLES from './card.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { comments: null };
  }

  render() {
    const {
      pageId, className, ...rest
    } = this.props;

    const classNameFinal = [getClassName('card__image')];
    if (className) classNameFinal.push(className);

    RestDbIoFunctions.getComments(pageId, (results) => {
      this.setState({ comments: results });
    });

    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.length === 0 ?
        (
          <SubSection name="No comments yet. Be the first!" />
        ) : (
          this.state.comments.map((c, i) =>
            (<SubSection name={`${c.commenter_name}`}>
              {c.comment}
            </SubSection >
            )));
    }

    const commentsLoading = (
      <SubSection name="Loading comments for blog..." >
        <BpkSpinner type={SPINNER_TYPES.dark} />
      </SubSection >
    );


    return (
      <Section name="Comments" >
        {this.state.comments ?
                (comments)
          :
                (commentsLoading)
          }
        <CommentInput pageId={pageId} />
      </Section >
    );
  }
}

export default Comments;
